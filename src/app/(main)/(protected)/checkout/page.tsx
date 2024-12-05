"use client";
import AddNewShippingAddress from "@/components/add-new-shipping-address";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import {
  fetchCartList,
  updateCartItemsShipping,
} from "@/services/cart-services";
import { createPayment, fetchProfileInfo } from "@/services/profile-services";
import { fetchShippingPrices } from "@/services/shipping-services";
import { userStore } from "@/store";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useStore } from "zustand";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

interface ShippingOption {
  _id: string;
  label: string;
  type: "island" | "mainland" | "home" | "pickup";
  price: number;
  __v: number;
}

const CheckoutPage = () => {
  const { formatNumber } = useNumberFormatter();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const userId = useStore(userStore, (state) => state.userId);

  const [selectedOption, setSelectedOption] = useState<null | string>(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // getting cart
  const {
    data: cartList,
    refetch: refetchCart,
    isLoading: isCartLoading,
  } = useQuery({
    queryKey: ["fetchCart"],
    queryFn: async () => {
      try {
        const response = await fetchCartList();
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so React Query can handle it.
      }
    },
  });

  const totalPrice =
    cartList?.items?.reduce(
      (acc, item) => acc + item?.productId?.price * item?.quantity,
      0
    ) || 0;

  // getting the profile info
  const {
    data: profileInformation,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["fetchProfile", userId],
    queryFn: async () => {
      try {
        const response = await fetchProfileInfo();
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  // fetching shipping prices list
  const {
    data: shippingPricesList,
    // isLoading: isShippingLoading,
    // error: isShippingPricesError,
    // refetch: refetchShippingPricesList,
  } = useQuery({
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

  const getShippingOptions = (state: string, city: string) => {
    // Define the Lagos-specific areas (you can extend this list if needed)
    const lagosIslandCities = [
      "Victoria Island",
      "Ikoyi",
      "Lekki",
      "Ajah",
      "Lagos Island",
    ];

    // Check if the state is Lagos
    if (state === "Lagos") {
      if (lagosIslandCities.includes(city)) {
        return shippingPricesList?.filter((item) => item?.type === "island");
      } else {
        return shippingPricesList?.filter((item) => item?.type === "mainland");
      }
    }

    // For any other state, return Home and Pickup options
    return shippingPricesList?.filter(
      (item) => item?.type !== "island" && item?.type !== "mainland"
    );
  };

  const shippingOptions: ShippingOption[] = getShippingOptions(
    profileInformation?.state,
    profileInformation?.city
  );

  // console.log(shippingOptions);

  const isShippingAvailable =
    profileInformation?.name &&
    profileInformation?.state &&
    profileInformation?.city &&
    profileInformation?.street &&
    profileInformation?.phoneNum;

  // creating payment
  const { mutate: startPayment, isPending: isPaymentPending } = useMutation({
    mutationFn: async () => {
      return await createPayment();
    },
    onSuccess: async (data) => {
      notify("success", "Payment initiated successfully!");
      openInNewTab(data?.data?.authorization_url);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const handlePlaceOrder = async () => {
    const cartBody = {
      orderId: cartList?._id,
      body: {
        shippingDetails: {
          name: profileInformation?.name,
          zipcode: profileInformation?.zipcode,
          country: profileInformation?.country,
          street: profileInformation?.street,
          state: profileInformation?.state,
          city: profileInformation?.city,
          phoneNum: profileInformation?.phoneNum,
        },
        shippingType: selectedOption,
      },
    };

    updateCartItemsShipping({ body: cartBody.body, orderId: cartBody.orderId });
    await startPayment();
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-6 p-6 lg:p-10 min-h-[60vh] font-hagrid container">
        <h1 className="font-bold text-[26px] text-[#203343]">Checkout</h1>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {/* address and payment methods container */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-2">
            {/* address */}
            <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex justify-between w-full text-xl text-[#43464E]">
                Shipping Address
                <Button
                  onClick={openDialog}
                  className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
                >
                  Edit
                </Button>
              </h3>

              {isLoading ? (
                <div className="min-h-[200px]">
                  <LoadingSpinner />
                </div>
              ) : (
                <Fragment>
                  <p className="text-sm text-[#43464E]">
                    Name: {profileInformation?.name || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    Email: {profileInformation?.email || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    Zipcode: {profileInformation?.zipcode || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    Street: {profileInformation?.street || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    State: {profileInformation?.state || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    Country: {profileInformation?.country || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    Phone: {profileInformation?.phoneNum || "-"}
                  </p>
                </Fragment>
              )}
            </div>

            {/* shipping options */}
            <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex w-full text-xl text-[#43464E]">
                Shipping Options
              </h3>

              <div className="flex flex-col gap-3">
                {shippingOptions?.map((opt, i) => {
                  return (
                    <div key={i} className="">
                      <input
                        type="radio"
                        id={`shipping-option-${opt.type}`}
                        name="shippingOption"
                        value={opt.type}
                        checked={selectedOption === opt.type}
                        onChange={handleOptionChange}
                        className="mr-2"
                      />
                      <label htmlFor={`shipping-option-${opt.type}`}>
                        {`${opt.label} - ₦${opt.price}`}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* shipping methods */}
            <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex w-full text-xl text-[#43464E]">
                Shipping Methods
              </h3>

              <p className="text-sm text-[#43464E]">
                Delivery period ranges from 10 to 12 working days.
              </p>
            </div>
          </div>

          {/* summary */}
          <aside className="col-span-1 flex flex-col gap-3">
            {/* items */}
            <div className=" flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
                Items
              </h3>

              {isCartLoading && <LoadingSpinner />}

              {!isCartLoading &&
                cartList?.items?.length > 0 &&
                cartList?.items?.map((item) => {
                  return (
                    <div key={item?._id} className="flex gap-5">
                      {/* item image */}
                      <Image
                        src={item?.frontCoverUrl}
                        alt="Cart item image"
                        width={100}
                        height={80}
                      />

                      {/* item details */}
                      <div className="flex flex-col">
                        <h3 className="font-bold flex flex-col text-base text-[#43464E]">
                          Custom Photobook
                          <span className="flex gap-2 items-center">
                            <span className="font-normal line-through">
                              ₦
                              {formatNumber(
                                item?.productId?.price * item?.quantity * 2
                              )}
                            </span>
                            <span className="font-normal">
                              ₦
                              {formatNumber(
                                item?.productId?.price * item?.quantity
                              )}
                            </span>
                          </span>
                        </h3>

                        <p className="text-sm  mt-4">Cover Type: Hardcover</p>
                        <p className="text-sm ">
                          Size: 11.5&apos;&apos; x 8.5&apos;&apos; Vertical
                        </p>
                        <p className="text-sm ">Paper Finish: Gloss Paper</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* summary */}
            <div className=" flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
                Summary
              </h3>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Subtotal:</span>

                <span className="flex gap-2 items-center">
                  <span className="font-normal line-through">
                    ₦{formatNumber(totalPrice * 2)}
                  </span>
                  <span className="font-normal">
                    ₦{formatNumber(totalPrice)}
                  </span>
                </span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Discount:</span>
                <span className="font-normal">N{formatNumber(totalPrice)}</span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Shipping:</span>
                <span className="font-normal">
                  N
                  {formatNumber(
                    shippingOptions.find(
                      (item) => item?.type === selectedOption
                    )?.price || 0
                  )}
                </span>
              </p>
            </div>

            <Button
              onClick={() => {
                if (!isShippingAvailable) {
                  notify(
                    "error",
                    "Please make sure to fill in all shipping details"
                  );
                  return;
                }

                if (!selectedOption) {
                  notify("error", "Please select a shipping method");
                  return;
                }

                handlePlaceOrder();
              }}
              disabled={isPaymentPending}
              className="flex gap-2 items-center py-4 px-8 text-sm mt-5"
            >
              {isPaymentPending && <LoadingSpinner />} Place order <MoveRight />
            </Button>
          </aside>
        </section>
      </div>

      {/* Dialog */}
      <AddNewShippingAddress
        refetch={refetch}
        refetchCart={refetchCart}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        profileInformation={profileInformation}
        cartList={cartList}
      />
    </Fragment>
  );
};

export default CheckoutPage;
