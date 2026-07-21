import authService from "../services/auth.service.js";
import { generateJWT } from "../utils/jwt.js";

const register = async (req, res) => {

  try {
    const newUser = await authService.register(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(error?.status || 400).send(error.message);
  }
};

const login = async (req, res) => {

  try {
    const loggedUser = await authService.login(req.body);

    const token = generateJWT(loggedUser);

    res.cookie("authToken", token, { maxAge: 1000 * 60 * 60 * 24 });
    return res.send(loggedUser);
  } catch (error) {
    return res.status(error?.status || 400).send(error.message);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const data = await authService.forgetPassword(req.body.email);
    return res.send(data);
  } catch (error) {
    return res.status(error?.status || 400).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = await authService.resetPassword(
      req.body.password,
      req.params.id,
    );
    return res.send(data);
  } catch (error) {
    return res.status(error?.status || 400).send(error.message);
  }
};
export default { login, register, forgetPassword, resetPassword };
