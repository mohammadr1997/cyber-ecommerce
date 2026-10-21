import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "firstName is required" }),
  lastName: z.string().min(1, { message: "lastName is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .regex(/^\S+@\S+\.\S+$/, { message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type formValues = z.infer<typeof signUpFormSchema>;
