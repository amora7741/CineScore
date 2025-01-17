"use client";

import AuthForm from "@/components/AuthForm";
import { SignUpCredentials } from "@/lib/validation/credentials";
import Link from "next/link";

const SignUp = () => {
  const handleSubmit = (data: SignUpCredentials) => {
    console.log(data);
  };

  return (
    <div className="flex w-full max-w-[450px] flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Sign Up</h1>

      <AuthForm page="signup" onSubmit={handleSubmit} />

      <div className="flex flex-wrap justify-center gap-1">
        <span>Have an account?</span>
        <Link
          href="/login"
          className="font-semibold text-muted-foreground hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
