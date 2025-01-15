"use client";

import {
  LogInCredentials,
  SignUpCredentials,
  loginSchema,
  signupSchema,
} from "@/lib/validation/credentials";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

const AuthForm = ({ page }: { page: "login" | "signup" }) => {
  const form = useForm<LogInCredentials | SignUpCredentials>({
    resolver: zodResolver(page === "login" ? loginSchema : signupSchema),
    defaultValues: {
      username: "",
      password: "",
      ...(page === "signup" ? { confirmPassword: "" } : {}),
    },
  });
};

export default AuthForm;
