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
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const SignIn = () => {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res.status !== 200) {
        throw JSON.parse(res.error);
      }

      return res;
    },
    onSuccess: async (data) => {
      notify("success", "Login successful!");
      push("/account/profile-settings");
    },
    onError: (error: { data: unknown; message: string }) => {
      notify("error", error.message);
    },
  });

  const onSubmit = (values: { email: string; password: string }) => {
    login({
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
          alt="I see logo"
          width={250}
          height={70}
          className="w-[130px]"
        />
      </Link>
      {/* form */}
      <div className="p-6 w-full flex flex-col border border-black rounded-md lg:max-w-[40%]">
        <h2 className="w-full text-center text-2xl font-bold">
          Sign in to your account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
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
            <Button disabled={isPending} type="submit">
              {isPending && <LoadingSpinner />} Sign In
            </Button>
          </form>
        </Form>

        {/* <Link href="/" className="underline mt-3 text-sm">
          Forgot password?
        </Link> */}
        <Link href="/auth/sign-up" className="underline mt-3 text-sm">
          Don&apos;t have an account? Sign Up Now.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
