import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";
import { sendEmail } from "../utils/email.js";

const register = async (user) => {
  const isUserExist = await User.findOne({
    $or: [{ email: user.email }, { phone: user.phone }],
  });

  if (isUserExist)
    throw {
      status: 409,
      message: "User already exist!",
    };
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  return await User.create({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: hashedPassword,
    role: user.role,
  });
};

const login = async (user) => {
  const isUserExist = await User.findOne({
    $or: [{ email: user.email }, { phone: user.phone }],
  });
  if (!isUserExist)
    throw {
      status: 404,
      message: "Sorry! User not found!",
    };

  const isPasswordMatched = await bcrypt.compareSync(
    user.password,
    isUserExist.password,
  );

  if (!isPasswordMatched)
    throw {
      status: 401,
      message: "Incorrect email or password!",
    };

  return {
    _id: isUserExist._id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };
};

const forgetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user)
    throw {
      status: 404,
      message: "User with this email doest not found!",
    };

  await ResetPassword.deleteMany({ user: user._id });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await ResetPassword.create({
    user: user._id,
    token: hashedToken,
  });

  const resetPasswordLink = `${config.appUrl}/reset-password?token=${resetToken}`;

  try {
    await sendEmail({
      receipient: user.email,
      resetPasswordLink,
    });
  } catch (error) {
    await ResetPassword.deleteMany({ user: user._id }); // Email fail vayo vane ResetPassword cleanup garne
    throw { message: "SorryThere are problem to send Email" };
  }

  return true;
};

const resetPassword = async (password, token) => {
  if (!token || !password)
    throw {
      message: "Token is required",
    };

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 2. Token Model ma khojne
  const tokenDoc = await ResetPassword.findOne({ token: hashedToken });
  if (!tokenDoc)
    throw {
      message: "Invalid token or expired token!!",
    };

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.findByIdAndUpdate(
    tokenDoc.user,
    {
      password: hashedPassword,
    },
    { new: true },
  );

  await ResetPassword.deleteOne({ id: tokenDoc._id });

  return user;
};

export default { register, login, forgetPassword, resetPassword };
