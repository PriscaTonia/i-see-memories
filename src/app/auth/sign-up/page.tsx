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

// Form schema with validation
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
    address: z.object({
      street: z.string().min(1, { message: "Street is required." }),
      zipcode: z
        .string()
        .min(5, { message: "Zipcode must be at least 5 characters." }),
      city: z.string().min(1, { message: "City is required." }),
      state: z.string().min(1, { message: "State is required." }),
      country: z.string().min(1, { message: "Country is required." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {
        street: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
      },
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
            {/* Name fields */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contact fields */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {/* Address fields */}
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street and house number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipcode"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="col-span-1 lg:col-span-2">
              Create Account
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
