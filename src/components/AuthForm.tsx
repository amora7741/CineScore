"use client";

import {
  LogInCredentials,
  SignUpCredentials,
  loginSchema,
  signupSchema,
} from "@/lib/validation/credentials";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const AuthForm = ({
  page,
  onSubmit,
}: {
  page: "login" | "signup";
  // eslint-disable-next-line
  onSubmit: (data: any) => void;
}) => {
  const form = useForm<LogInCredentials | SignUpCredentials>({
    resolver: zodResolver(page === "login" ? loginSchema : signupSchema),
    defaultValues: {
      username: "",
      password: "",
      ...(page === "signup" ? { confirmPassword: "" } : {}),
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="py-6" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage className="absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="py-6"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />

        {page === "signup" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="py-6"
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-6 right-0" />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="!mt-14 w-full py-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="!size-6 animate-spin" />
          ) : (
            <span>{page === "login" ? "Log In" : "Sign Up"}</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
