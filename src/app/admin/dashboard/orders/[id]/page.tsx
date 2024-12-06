"use client";

import PictureListModal from "@/components/picture-list-modal";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import UpdateOrder from "@/components/update-order";
import { notify } from "@/lib/notify";
import { Item } from "@/lib/types";
import {
  fetchAnOrderDetails,
  OrderStatusEnum,
} from "@/services/order-services";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = ({ params }) => {
  const { id } = params;
  const { back } = useRouter();

  const { formatNumber } = useNumberFormatter();

  const [isDialogOpen, setDialogOpen] = useState(false);
  // const [isPictureDialogOpen, setPictureDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  // const openPictureDialog = () => setPictureDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  // const closePictureDialog = () => setPictureDialogOpen(false);

  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const openPictureDialog = (item) => {
    setActiveItem(item); // Set the active item
  };

  const closePictureDialog = () => {
    setActiveItem(null); // Reset the active item
  };

  // console.log(activeItem);

  const {
    data: orderItem,
    refetch: OrderRefetch,
    error: OrderError,
    isLoading,
  } = useQuery({
    queryKey: ["getAnOrder"],
    queryFn: async () => {
      try {
        const response = await fetchAnOrderDetails({ id });
        // const response = await fetchCartList();
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

  // cart error
  if (OrderError)
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading order details.</p>

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
      <div className="w-full flex justify-between">
        <h2 className="text-lg lg:text-xl font-bold flex gap-3">
          <MoveLeft onClick={() => back()} className="cursor-pointer" /> Order
          Details
        </h2>

        <Button
          onClick={openDialog}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Edit Order
        </Button>
      </div>

      {isLoading && (
        <div className="min-h-[200px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {/* order info */}
      <section className="flex flex-col gap-1">
        <h3 className="font-bold text-base lg:text-lg">
          Order No. {orderItem?.orderNo}
        </h3>

        <p className="text-sm w-full">{orderItem?.items?.length} Items</p>
        <p className="text-sm w-full">
          Ordered on {new Date(orderItem?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm w-full">Total: ₦{formatNumber(totalPrice)}</p>
        <p className="text-sm w-full mt-2">
          <span
            className={clsx(
              "font-semibold text-xs px-3 py-1 rounded",
              isPaid && "bg-blue-100 text-blue-700 ",
              isProcessing && "bg-yellow-100 text-yellow-700",
              isDelivered && "bg-green-100 text-green-700"
            )}
          >
            {orderItem?.status}
          </span>
        </p>

        {/* items */}
        <h3 className="font-bold text-base lg:text-lg border-b mt-10 pb-1">
          Order Items
        </h3>

        <div className="flex flex-col gap-5 mt-4">
          {orderItem?.items?.map((item, i) => {
            return (
              <div
                key={item?._id}
                className="flex flex-col gap-2 md:max-w-[95%] w-full"
              >
                {/* customization details */}
                <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Title: </span>
                  <span className="font-normal">{item?.title}</span>
                </p>
                <p className="text-sm w-full flex gap-1 ">
                  <span className="font-bold">Sub Title: </span>
                  <span className="font-normal">{item?.subTitle}</span>
                </p>
                <p className="text-sm w-full flex gap-1 mb-2">
                  <span className="font-bold">Color Code: </span>
                  <span className="font-normal uppercase">{item?.color}</span>
                  <span
                    className="w-[30px] h-[20px] rounded-md"
                    style={{ backgroundColor: item?.color }}
                  ></span>
                </p>

                {/* other item details */}
                <section className="w-full  flex flex-col sm:flex-row gap-3 justify-between">
                  <div className="flex-1 flex gap-3">
                    <Image
                      src={item?.frontCoverUrl}
                      alt=""
                      width={100}
                      height={100}
                    />

                    <div className="flex flex-col gap-1 w-full max-w-[60%] ">
                      <p className="text-sm w-full flex gap-1 ">
                        <span className="font-bold">
                          Custom Photobook {i + 1}{" "}
                        </span>
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

                  {/* images list */}
                  <button
                    onClick={() => openPictureDialog(item)}
                    className="underline font-semibold w-fit"
                  >
                    View Images
                  </button>

                  {/* Pictures Dialog */}
                  {activeItem && (
                    <PictureListModal
                      isOpen={activeItem?._id === item?._id}
                      onClose={closePictureDialog}
                      pictures={activeItem?.pictures || []}
                      orderNo={orderItem?.orderNo || ""}
                      frontCoverUrl={activeItem?.frontCoverUrl || ""}
                      fullCoverUrl={activeItem?.fullCoverUrl || ""}
                    />
                  )}
                </section>
              </div>
            );
          })}
        </div>

        {/* shipping */}
        <h3 className="font-bold text-base lg:text-lg border-b mt-10 pb-1">
          Customer Shipping Details
        </h3>

        <h4 className="text-sm w-full flex gap-1 font-bold mt-4">
          Shipping method:{" "}
          <span className="font-normal">
            {orderItem?.shippingPrice?.label || "None Available"}
          </span>
        </h4>
        <p className="text-sm w-full flex gap-1 ">
          <span className="font-bold">Shipping price: </span>
          <span className="font-normal">
            ₦{formatNumber(orderItem?.shippingPrice?.price || 0)}
          </span>
        </p>

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
            State:{orderItem?.shippingDetails?.state}
          </p>
          <p className="text-sm w-full flex gap-1 ">
            Country:{orderItem?.shippingDetails?.country}
          </p>
        </div>
      </section>

      {/* end */}

      {/* Dialog */}
      <UpdateOrder
        refetch={OrderRefetch}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        orderItem={orderItem}
      />
    </div>
  );
};

export default Page;
