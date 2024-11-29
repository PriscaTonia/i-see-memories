"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { fetchOrdersList } from "@/services/cart-services";
// import useNumberFormatter from "@/utils/useNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OrderHistory = () => {
  const { push } = useRouter();
  // const { formatNumber } = useNumberFormatter();

  const {
    data: orderList,
    refetch: OrderRefetch,
    error: OrderError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchOrder"],
    queryFn: async () => {
      try {
        const response = await fetchOrdersList();
        // const response = await fetchCartList();
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  console.log(orderList);

  // cart error
  if (OrderError)
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading your orders.</p>

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
      <h2 className="text-lg lg:text-xl font-bold hidden lg:flex">
        Order History
      </h2>

      <p className="">
        Check the details and status of your orders in the online store. To
        cancel your order or request a return, send us a mail at
        support@mail.com
      </p>

      {isLoading && (
        <div className="min-h-[200px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && orderList < 1 && (
        <p className="mt-4">You currently have no orders Start shopping!</p>
      )}

      {orderList?.map((order, i) => {
        const firstItem = order?.items?.[0];
        const isPaid = order?.status === "Paid";

        return (
          <section
            key={order?._id}
            className="border p-4 rounded flex flex-col md:flex-row gap-3 justify-between"
          >
            <div
              key={firstItem?._id}
              className="w-full md:max-w-[80%] flex gap-3"
            >
              <Image
                src={firstItem?.frontCoverUrl}
                alt=""
                width={100}
                height={100}
              />

              <div className="flex flex-col gap-1 w-full max-w-[60%]">
                <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Custom Photobook </span>
                </p>
                <p className="text-sm w-full flex items-center gap-1 ">
                  <span className="font-bold">Status: </span>
                  <span
                    className={clsx(
                      "font-bold",
                      isPaid && "bg-green-100 text-green-700 px-2 py-1 rounded"
                    )}
                  >
                    {order?.status}
                  </span>
                </p>
                <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Date: </span>
                  <span className="font-normal">
                    {new Date(order?.createdAt).toDateString()}
                  </span>
                </p>

                {/* <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Quantity: </span>
                  <span className="font-normal">{firstItem?.quantity}</span>
                </p> */}

                {/* <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Cost: </span>
                  <span className="font-normal">
                    ₦
                    {formatNumber(
                      firstItem?.quantity * firstItem?.productId?.price || 0
                    )}
                  </span>
                </p> */}

                {/* <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Page count: </span>
                  <span className="font-normal">
                    {firstItem?.productId?.pageCount}
                  </span>
                </p> */}
              </div>
            </div>

            <div className="flex flex-col gap-3 justify-between items-end">
              <Button
                onClick={() =>
                  push(`/account/order-history/${order?._id}?orderNo=${i + 1}`)
                }
                type="button"
                className="w-fit"
              >
                View Details
              </Button>

              <h3 className="text-base font-semibold">Order #{i + 1}</h3>
            </div>

            {/* {order?.items?.map((item) => {
              return (
                <div key={item?._id} className="flex gap-3 mb-4 shadow-md">
                  <Image
                    src={item?.frontCoverUrl}
                    alt=""
                    width={100}
                    height={100}
                  />

                  <div className="flex flex-col gap-1 w-full max-w-[60%]">
                    <p className="text-sm w-full flex gap-1 ">
                      <span className="font-bold">Quantity: </span>
                      <span className="font-normal">{item?.quantity}</span>
                    </p>

                    <p className="text-sm w-full flex gap-1 ">
                      <span className="font-bold">Price: </span>
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
            })} */}

            {/* <h4 className="font-semibold text-base lg:text-lg">
              Shipping Address:{" "}
            </h4>

            <div className="flex flex-col gap-1 w-full max-w-[60%]">
              <p className="text-sm w-full flex gap-1 ">
                {order?.shippingDetails?.name}
              </p>

              <p className="text-sm w-full flex gap-1 ">
                {order?.shippingDetails?.phoneNum}
              </p>

              <p className="text-sm w-full flex gap-1 ">
                {order?.shippingDetails?.street}
              </p>

              <p className="text-sm w-full flex gap-1 ">
                {order?.shippingDetails?.zipcode} {order?.shippingDetails?.city}
                , {order?.shippingDetails?.state}
              </p>

              <p className="text-sm w-full flex gap-1 ">
                {order?.shippingDetails?.country}.
              </p>
            </div> */}
          </section>
        );
      })}
    </div>
  );
};

export default OrderHistory;
