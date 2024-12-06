import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile-services";
import { notify } from "@/lib/notify";
import axios, { AxiosError } from "axios";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useEffect, useState } from "react";
import { updateCartItemsShipping } from "@/services/cart-services";
import { CartList, Profile } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities_in_lagos, countries } from "@/lib/data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  refetchCart: () => void;
  profileInformation: Profile;
  cartList: CartList;
}

// Form schema with validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{1,3})?(\(?\d{1,4}\)?[-.\s]?)?[\d\s-]{7,14}$/, {
      message: "Invalid phone number.",
    }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    zipcode: z
      .string()
      .min(5, { message: "Zipcode must be at least 5 characters." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    country: z.string().min(1, { message: "Country is required." }),
  }),
});

const AddNewShippingAddress = ({
  isOpen,
  onClose,
  refetch,
  profileInformation,
  cartList,
  refetchCart,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",

      address: {
        street: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  const { setValue } = form;

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  // getting states and cities
  const { data: statesList } = useQuery({
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
        throw error; // Rethrow the error so React Query can handle it.
      }
    },
    enabled: !!countryCode,
  });

  const { data: citiesList } = useQuery({
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

  // update shipping address in profile
  const { mutate: update, isPending } = useMutation({
    mutationFn: async ({
      body,
    }: {
      body: {
        name: string;
        zipcode: string;
        country: string;
        street: string;
        state: string;
        city: string;
        phoneNum: string;
      };
    }) => {
      return await updateProfile({ body: body });
    },
    onSuccess: async () => {
      notify("success", "Profile Updated successfully!");
      refetch();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  // update shipping address for all cart items
  const { mutate: updateCart, isPending: isUpdateCartPending } = useMutation({
    mutationFn: async ({
      body,
      orderId,
    }: {
      orderId: string;
      body: {
        shippingDetails: {
          name: string;
          zipcode: string;
          country: string;
          street: string;
          state: string;
          city: string;
          phoneNum: string;
        };
      };
    }) => {
      return await updateCartItemsShipping({ body, orderId });
    },
    onSuccess: async () => {
      notify("success", "Shipping Updated successfully!");
      refetchCart();
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message;
      notify("error", message as string);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const cartBody = {
      orderId: cartList?._id,
      body: {
        shippingDetails: {
          name: `${values.firstName} ${values.lastName}`,
          zipcode: values.address.zipcode,
          country: values.address.country,
          street: values.address.street,
          state: values.address.state,
          city: values.address.city,
          phoneNum: values.phoneNumber,
        },
      },
    };

    const body = {
      name: `${values.firstName} ${values.lastName}`,
      zipcode: values.address.zipcode,
      country: values.address.country,
      street: values.address.street,
      state: values.address.state,
      city: values.address.city,
      phoneNum: values.phoneNumber,
    };

    await update({ body: body });
    await updateCart({ body: cartBody.body, orderId: cartBody.orderId });
  };

  useEffect(() => {
    if (profileInformation) {
      // Split name into firstName and lastName
      const [firstName = "", lastName = ""] =
        profileInformation.name?.split(" ") || [];

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phoneNumber", profileInformation.phoneNum || "");
      setValue("address.street", profileInformation.street || "");
      setValue("address.zipcode", profileInformation.zipcode || "");
      setValue("address.city", profileInformation.city || "");
      setValue("address.state", profileInformation.state || "");
      setValue("address.country", profileInformation.country || "");
    }
  }, [setValue, profileInformation]);

  useEffect(() => {
    // country
    if (profileInformation?.country) {
      const selectedCountry = countries?.find(
        (country) => country?.name === profileInformation?.country
      );
      if (selectedCountry) {
        setCountryCode(selectedCountry.code);
      }
    }

    // state
    if (profileInformation?.state) {
      const selectedState = statesList?.find(
        (state) => state?.name === profileInformation?.state
      );
      if (selectedState) {
        setStateCode(selectedState?.iso2);
      }
    }
  }, [profileInformation?.country, profileInformation?.state, statesList]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80%] md:max-w-[60%] max-h-[80%] overflow-y-scroll lg:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>Update shipping address</DialogTitle>
        </DialogHeader>

        {/* form */}
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
              name="address.country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        if (value) {
                          const selectedCountry = countries?.find(
                            (country) => country?.name === value
                          );
                          if (selectedCountry) {
                            setCountryCode(selectedCountry?.code);
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
              name="address.state"
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
              name="address.city"
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

            <DialogFooter className="flex flex-col md:flex-row col-span-1 lg:col-span-2 justify-between w-full items-center">
              <Button
                type="button"
                className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending || isUpdateCartPending}>
                {(isPending || isUpdateCartPending) && <LoadingSpinner />}{" "}
                Update address
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewShippingAddress;
