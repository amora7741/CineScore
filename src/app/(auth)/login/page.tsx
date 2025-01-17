"use client";

import AuthForm from "@/components/AuthForm";
import { LogInCredentials } from "@/lib/validation/credentials";
import Link from "next/link";

const Login = () => {
  const handleSubmit = (data: LogInCredentials) => {
    console.log(data);
  };

  return (
    <div className="flex size-full flex-col items-center justify-evenly bg-background p-8 shadow-lg sm:h-fit sm:max-w-[500px] sm:gap-8 sm:rounded-lg lg:shadow-none">
      <h1 className="text-5xl font-bold">Log In</h1>

      <AuthForm page="login" onSubmit={handleSubmit} />

      <div className="flex flex-wrap justify-center gap-1">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/signup"
          className="font-semibold text-muted-foreground hover:underline"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
