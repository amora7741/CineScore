import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LogInCredentials = z.infer<typeof loginSchema>;
export type SignUpCredentials = z.infer<typeof signupSchema>;
