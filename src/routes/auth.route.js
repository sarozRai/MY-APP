import express from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { userForgetPasswordSchema, userRegisterSchema, userResetPasswordSchema } from "../validations/userValidation.js";

const router = express.Router();

router.post(
  "/users/register",
  validate(userRegisterSchema),
  authController.register,
);
router.post("/users/login", authController.login);

router.post("/forget-password", validate(userForgetPasswordSchema), authController.forgetPassword);

router.post("/reset-password/:id", validate(userResetPasswordSchema), authController.resetPassword);

export default router;
