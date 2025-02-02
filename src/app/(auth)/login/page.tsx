"use client";

import AuthForm from "@/components/AuthForm";
import { LogInCredentials } from "@/lib/validation/credentials";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (data: LogInCredentials) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "Failed to sign in");
      } else {
        startTransition(() => {
          router.push("/");
          router.refresh();
        });
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-evenly gap-8 bg-background p-8 shadow-lg sm:h-fit sm:max-w-[500px] sm:rounded-lg lg:shadow-none">
      {isLoading && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-md">
          <LoaderCircle className="size-20 animate-spin" />
        </div>
      )}

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
