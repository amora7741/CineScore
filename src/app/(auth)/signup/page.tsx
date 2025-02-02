"use client";

import AuthForm from "@/components/AuthForm";
import { SignUpCredentials } from "@/lib/validation/credentials";
import axios from "axios";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (data: SignUpCredentials) => {
    try {
      await axios.post("/api/auth/register", data);

      toast({
        variant: "success",
        title: "Success!",
        description: "You sucessfully registered.",
      });

      startTransition(() => {
        router.push("/login");
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Something went wrong!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-evenly gap-8 bg-background p-8 shadow-lg sm:h-fit sm:max-w-[500px] sm:rounded-lg lg:shadow-none">
      {isLoading && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-md">
          <LoaderCircle className="size-20 animate-spin" />
        </div>
      )}

      <h1 className="text-5xl font-bold">Sign Up</h1>

      <AuthForm page="signup" onSubmit={handleSubmit} />

      <div className="flex flex-wrap justify-center gap-1">
        <span>Have an account?</span>
        <Link
          href="/login"
          className="font-semibold text-muted-foreground hover:underline"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
