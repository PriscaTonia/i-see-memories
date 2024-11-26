"use client";

import React, { useEffect } from "react";
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
import { Profile } from "@/lib/types";
import { LoadingSpinner } from "./ui/loading-spinner";

// profile settings validation validation
const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{1,3})?(\(?\d{1,4}\)?[-.\s]?)?[\d\s-]{7,14}$/, {
      message: "Invalid phone number.",
    }),
  email: z.string().email({ message: "Invalid email address." }),
});

interface Props {
  isPending: boolean;
  update: (data: {
    body: {
      name?: string;
      email?: string;
      phoneNum?: string;
    };
  }) => void;
  profileInformation: Profile;
  sec: string;
  setSec: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateProfileForm = ({
  isPending,
  update,
  profileInformation,
  sec,
  setSec,
}: Props) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setSec("profile");
    const body = {
      name: `${values.firstName} ${values.lastName}`,
      phoneNum: values.phoneNumber,
      email: values.email,
    };

    await update({ body: body });
  };

  useEffect(() => {
    if (profileInformation) {
      // Split name into firstName and lastName
      const [firstName = "", lastName = ""] =
        profileInformation.name?.split(" ") || [];

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phoneNumber", profileInformation.phoneNum || "");
      setValue("email", profileInformation.email || "");
    }
  }, [setValue, profileInformation]);

  return (
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

        <div className="col-span-1 lg:col-span-2">
          <Button disabled={isPending} type="submit" className="w-fit">
            {isPending && sec === "profile" && <LoadingSpinner />} Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
