"use client";

import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Profile } from "@/lib/types";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { cities_in_lagos, countries } from "@/lib/data";
import axios from "axios";

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

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  // getting states and cities
  const { data: statesList = [] } = useQuery({
    queryKey: ["fetchState", countryCode],
    queryFn: async () => {
      try {
        const config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
          headers: {
            "X-CSCAPI-KEY":
              "OVM2TEJPWHd2SHRJbjJDSzhGaFQzczZPNk1OdUJQUFp0N0pTVHl1OQ==",
          },
        };

        const response = await axios(config);
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!countryCode,
  });

  const { data: citiesList = [] } = useQuery({
    queryKey: ["fetchCities", countryCode, stateCode],
    queryFn: async () => {
      try {
        if (stateCode === "LA") {
          return cities_in_lagos;
        }

        const config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
          headers: {
            "X-CSCAPI-KEY":
              "OVM2TEJPWHd2SHRJbjJDSzhGaFQzczZPNk1OdUJQUFp0N0pTVHl1OQ==",
          },
        };

        const response = await axios(config);
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!stateCode,
  });

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
      form.reset({
        street: profileInformation.street || "",
        zipcode: profileInformation.zipcode || "",
        city: profileInformation.city || "",
        state: profileInformation.state || "",
        country: profileInformation.country || "",
      });
    }
  }, [profileInformation, form]);

  useEffect(() => {
    if (profileInformation?.country && countries) {
      const selectedCountry = countries.find(
        (country) => country.name === profileInformation.country
      );

      if (selectedCountry) {
        setCountryCode(selectedCountry.code);
      }
    }
  }, [profileInformation, setValue]);

  useEffect(() => {
    if (profileInformation?.state && statesList) {
      const selectedState = statesList?.find(
        (state) => state.name === profileInformation.state
      );
      if (selectedState) {
        setStateCode(selectedState.iso2);
      }
    }
  }, [profileInformation?.state, statesList, setValue]);

  return (
    <Form key={profileInformation._id || "form"} {...form}>
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
          name="country"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    if (value) {
                      const selectedCountry = countries.find(
                        (country) => country.name === value
                      );

                      if (selectedCountry) {
                        setCountryCode(selectedCountry.code);
                      }
                      field.onChange(value);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>

                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem key={country?.code} value={country?.name}>
                        {country?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={(value) => {
                    if (value) {
                      const selectedState = statesList?.find(
                        (state) => state?.name === value
                      );
                      if (selectedState) {
                        setStateCode(selectedState?.iso2);
                      }
                      field.onChange(value);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {statesList?.map((state) => (
                      <SelectItem key={state?.id} value={state?.name}>
                        {state?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={(value) => {
                    if (value) {
                      field.onChange(value);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {citiesList?.map((city) => (
                      <SelectItem key={city?.id} value={city?.name}>
                        {city?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
