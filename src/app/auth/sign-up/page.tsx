"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth-services";
import { Loader2 } from "lucide-react";

// Form schema with validation
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //@ts-expect-error error
  const { mutate: register, isLoading } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await registerUser(data);
    },
    onSuccess: () => {
      notify("success", "Registration successful!");
      push("/auth/sign-in");
    },
    onError: (error: AxiosError) => {
      console.log(error);

      const message =
        // @ts-expect-error error
        error.response?.data?.message ||
        "An error occurred during registration.";
      notify("error", message);
    },
  });

  const onSubmit = (values: { email: string; password: string }) => {
    register({
      email: values?.email,
      password: values?.password,
    });
  };

  return (
    <div className="flex container flex-col gap-6 px-6 py-10 w-full font-hagrid items-center">
      {/* logo */}
      <Link href="/" className="max-h-[70px] overflow-hidden">
        <Image
          src="/logo.png"
          alt="Logo"
          width={250}
          height={70}
          className="w-[130px]"
        />
      </Link>
      {/* form */}
      <div className="p-6 w-full flex flex-col border border-black rounded-md lg:max-w-[60%]">
        <h2 className="w-full text-center text-2xl font-bold mb-6">
          Create your account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-6 grid grid-cols-1 lg:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password fields */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="col-span-1 lg:col-span-2"
            >
              {isLoading && <Loader2 className="animate-spin" />} Create Account
            </Button>
          </form>
        </Form>

        <Link href="/" className="underline mt-3 text-sm">
          Forgot password?
        </Link>
        <Link href="/auth/sign-in" className="underline mt-3 text-sm">
          Already have an account? Sign In.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
