import { Resend } from "resend";
import config from "../config/config.js";
const sendEmail = async (data) => {
  const resend = new Resend(config.resendApiKey);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.receipient,
    subject: "Reset Password Link",
    html: `<p>Please click the link below to reset your password:</p>
         <p><a href="${data.resetPasswordLink}" style="color: #2563eb; font-weight: bold; text-decoration: underline;">Reset Password</a></p>`,
  });
};

export { sendEmail };
