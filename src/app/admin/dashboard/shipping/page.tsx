"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import clsx from "clsx";
import {
  fetchShippingPrices,
  updateShippingPrices,
} from "@/services/shipping-services";
import { notify } from "@/lib/notify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ShippingOption } from "@/lib/types";
import { AxiosError } from "axios";

// schema
const formSchema = z.object({
  homeDelivery: z.preprocess((val) => Number(val), z.number()),
  pickupDelivery: z.preprocess((val) => Number(val), z.number()),
  lagosIslandDelivery: z.preprocess((val) => Number(val), z.number()),
  lagosMainlandDelivery: z.preprocess((val) => Number(val), z.number()),
});

const Shipping = () => {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeDelivery: 0,
      pickupDelivery: 0,
      lagosIslandDelivery: 0,
      lagosMainlandDelivery: 0,
    },
  });

  // fetching shipping prices list
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchShipping"],
    queryFn: async () => {
      try {
        const response = await fetchShippingPrices();
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  // updating shipping prices list
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (body: ShippingOption[]) => {
      return await updateShippingPrices(body);
    },
    onSuccess: async () => {
      notify("success", `Shipping prices updated successfully!`);

      refetch();
      setIsEdit(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const onSubmit = (values: {
    homeDelivery: number;
    pickupDelivery: number;
    lagosIslandDelivery: number;
    lagosMainlandDelivery: number;
  }) => {
    //code ...
    const updatedData = data?.map((item) => {
      switch (item.type) {
        case "home":
          item.price = values.homeDelivery;
          break;
        case "pickup":
          item.price = values.pickupDelivery;
          break;
        case "island":
          item.price = values.lagosIslandDelivery;
          break;
        case "mainland":
          item.price = values.lagosMainlandDelivery;
          break;
        default:
          break;
      }
      return {
        label: item?.label,
        price: item?.price,
        type: item?.type,
      };
    });

    update(updatedData);
    // console.log(updatedData);
  };

  useEffect(() => {
    // Ensure form values are updated when shippingData changes
    form.reset({
      homeDelivery: data?.find((item) => item?.type === "home")?.price || 0,
      pickupDelivery: data?.find((item) => item?.type === "pickup")?.price || 0,
      lagosIslandDelivery:
        data?.find((item) => item?.type === "island")?.price || 0,
      lagosMainlandDelivery:
        data?.find((item) => item?.type === "mainland")?.price || 0,
    });
  }, [data, form]);

  // products error
  if (error) {
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading shipping prices.</p>

        <Button
          onClick={() => {
            refetch();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch!
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <div className="w-full flex justify-between">
        <h2 className="text-lg lg:text-xl font-bold flex gap-3">
          Shipping Prices
        </h2>

        <Button
          onClick={() => {
            setIsEdit(true);
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Edit Prices
        </Button>
      </div>

      {isLoading && (
        <div className="min-h-[200px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {/* form */}
      {!isLoading && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="lagosIslandDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Island Delivery (Inside Lagos)</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx(!isEdit && "border-none bg-[#f2f2f2]")}
                      disabled={!isEdit}
                      placeholder="N10,000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lagosMainlandDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mainland Delivery (Inside Lagos)</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx(!isEdit && "border-none bg-[#f2f2f2]")}
                      disabled={!isEdit}
                      placeholder="N10,000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homeDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Delivery (Outside Lagos)</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx(!isEdit && "border-none bg-[#f2f2f2]")}
                      disabled={!isEdit}
                      placeholder="N10,000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Delivery (Outside Lagos)</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx(!isEdit && "border-none bg-[#f2f2f2]")}
                      disabled={!isEdit}
                      placeholder="N10,000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEdit && (
              <Button type="submit" disabled={isPending}>
                {isPending && <LoadingSpinner />}
                Update
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default Shipping;
