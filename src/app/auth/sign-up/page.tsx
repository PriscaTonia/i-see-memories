"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
          Create your account
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
            <Button type="submit">Create</Button>
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
