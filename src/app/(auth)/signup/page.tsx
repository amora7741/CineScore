"use client";

import AuthForm from "@/components/AuthForm";
import { SignUpCredentials } from "@/lib/validation/credentials";
import Link from "next/link";

const SignUp = () => {
  const handleSubmit = (data: SignUpCredentials) => {
    console.log(data);
  };

  return (
    <div className="flex size-full flex-col items-center justify-evenly bg-background p-8 shadow-lg sm:h-fit sm:max-w-[500px] sm:gap-8 sm:rounded-lg lg:shadow-none">
      <h1 className="text-5xl font-bold">Sign Up</h1>

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
