"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { fetchAnOrder } from "@/services/cart-services";
import { OrderStatusEnum } from "@/services/order-services";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Page = ({ params }) => {
  const { id } = params;
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const orderNo = searchParams.get("orderNo");
  const { formatNumber } = useNumberFormatter();

  const {
    data: orderItem,
    refetch: OrderRefetch,
    error: OrderError,
    isLoading,
  } = useQuery({
    queryKey: ["getAnOrderDetail"],
    queryFn: async () => {
      try {
        const response = await fetchAnOrder({ id });
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  const totalPrice =
    orderItem?.items?.reduce(
      (acc, item) => acc + item?.productId?.price * item?.quantity,
      0
    ) || 0;

  const isPaid = orderItem?.status === OrderStatusEnum.Paid;
  const isProcessing = orderItem?.status === OrderStatusEnum.Processing;
  const isDelivered = orderItem?.status === OrderStatusEnum.Delivered;

  // console.log(orderItem);

  // cart error
  if (OrderError)
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading your order details.</p>

        <Button
          onClick={() => {
            OrderRefetch();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch!
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <h2 className="text-lg lg:text-xl font-bold hidden lg:flex gap-3">
        <MoveLeft onClick={() => back()} className="cursor-pointer" /> Order
        Details
      </h2>

      <p className="text-sm">
        View the details and status of your orders in the online store. To
        cancel your order or request a return, send us a mail at
        support@mail.com
      </p>

      {isLoading && (
        <div className="min-h-[200px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {/* order info */}
      <section className="flex flex-col gap-1">
        <h3 className="font-bold text-base lg:text-lg">Order No. #{orderNo}</h3>

        <p className="text-sm w-full">{orderItem?.items?.length} Items</p>
        <p className="text-sm w-full">
          Ordered on {new Date(orderItem?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm w-full">Total: ₦{formatNumber(totalPrice)}</p>
        <p className="text-sm w-full mt-2">
          <span
            className={clsx(
              "font-bold",
              isPaid && "bg-blue-100 text-blue-700 px-2 py-1 rounded",
              isProcessing && "bg-yellow-100 text-yellow-700 px-2 py-1 rounded",
              isDelivered && "bg-green-100 text-green-700 px-2 py-1 rounded"
            )}
          >
            {orderItem?.status}
          </span>
        </p>

        {/* items */}
        <h3 className="font-bold text-base lg:text-lg border-b mt-10 pb-1">
          Your Items
        </h3>

        <div className="flex flex-col gap-5 mt-4">
          {orderItem?.items?.map((item, i) => {
            return (
              <div key={item?._id} className="w-full md:max-w-[80%] flex gap-3">
                <Image
                  src={item?.frontCoverUrl}
                  alt=""
                  width={100}
                  height={100}
                />

                <div className="flex flex-col gap-1 w-full max-w-[60%]">
                  <p className="text-sm w-full flex gap-1 ">
                    <span className="font-bold">Custom Photobook {i + 1} </span>
                  </p>

                  <p className="text-sm w-full flex gap-1 ">
                    <span className="font-bold">Quantity: </span>
                    <span className="font-normal">{item?.quantity}</span>
                  </p>

                  <p className="text-sm w-full flex gap-1 ">
                    <span className="font-bold">Cost: </span>
                    <span className="font-normal">
                      ₦
                      {formatNumber(
                        item?.quantity * item?.productId?.price || 0
                      )}
                    </span>
                  </p>

                  <p className="text-sm w-full flex gap-1 ">
                    <span className="font-bold">Page count: </span>
                    <span className="font-normal">
                      {item?.productId?.pageCount}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* shipping */}
        <h3 className="font-bold text-base lg:text-lg border-b mt-10 pb-1">
          Shipping Address
        </h3>

        <div className="flex flex-col gap-1 w-full max-w-[60%] mt-4">
          <p className="text-sm w-full flex gap-1 ">
            Name: {orderItem?.shippingDetails?.name}
          </p>

          <p className="text-sm w-full flex gap-1 ">
            Phone: {orderItem?.shippingDetails?.phoneNum}
          </p>

          <p className="text-sm w-full flex gap-1 ">
            Street: {orderItem?.shippingDetails?.street}
          </p>
          <p className="text-sm w-full flex gap-1 ">
            Zipcode: {orderItem?.shippingDetails?.zipcode}
          </p>
          <p className="text-sm w-full flex gap-1 ">
            City: {orderItem?.shippingDetails?.city}
          </p>
          <p className="text-sm w-full flex gap-1 ">
            {orderItem?.shippingDetails?.state}
          </p>
          <p className="text-sm w-full flex gap-1 ">
            {orderItem?.shippingDetails?.country}
          </p>
        </div>
      </section>

      {/* end */}
    </div>
  );
};

export default Page;
