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
  street: z.string().min(1, { message: "Street is required." }),
  zipcode: z
    .string()
    .min(5, { message: "Zipcode must be at least 5 characters." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  country: z.string().min(1, { message: "Country is required." }),
});

interface Props {
  isPending: boolean;
  update: (data: {
    body: {
      zipcode?: string;
      country?: string;
      street?: string;
      state?: string;
      city?: string;
    };
  }) => void;
  profileInformation: Profile;
  sec: string;
  setSec: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateAddressForm = ({
  isPending,
  update,
  profileInformation,
  sec,
  setSec,
}: Props) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      street: "",
      zipcode: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setSec("address");
    const body = {
      zipcode: values.zipcode,
      country: values.country,
      street: values.street,
      state: values.state,
      city: values.city,
    };

    await update({ body: body });
  };

  useEffect(() => {
    if (profileInformation) {
      setValue("street", profileInformation.street || "");
      setValue("zipcode", profileInformation.zipcode || "");
      setValue("city", profileInformation.city || "");
      setValue("state", profileInformation.state || "");
      setValue("country", profileInformation.country || "");
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
          name="street"
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
          name="zipcode"
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
          name="city"
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
          name="state"
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
          name="country"
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

        <div className="col-span-1 lg:col-span-2">
          <Button disabled={isPending} type="submit" className="w-fit">
            {isPending && sec === "address" && <LoadingSpinner />} Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAddressForm;
