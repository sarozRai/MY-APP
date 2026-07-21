import z from 'zod';

export const userRegisterSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 character long"),
    email: z.email("Invalid Email format"),
    phone: z.string().min(10, "Number must be exactly 10 digits").max(10, "Number must be exactly 10 digits"),
    password: z.string().min(8, "Password must be 8 character long"),
    role: z.array(z.enum(['ADMIN', 'USER', 'MERCHANT'])).optional()
})

export const userForgetPasswordSchema = z.object({
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email should be in text format" }).email("Invlid email format")
})

export const userResetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be 8 character long")
})

export const userUpdateSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 character long").optional(),
    phone: z.string().min(10, "Number must be exactly 10 digits").max(10, "Number must be exactly 10 digits").optional()
})