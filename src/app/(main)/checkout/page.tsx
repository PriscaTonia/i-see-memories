"use client";
import AddNewShippingAddress from "@/components/add-new-shipping-address";
// import ShippingAddressModal from "@/components/shipping-address-modal";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { fetchCartList } from "@/services/cart-services";
import { fetchProfileInfo } from "@/services/profile-services";
import { userStore } from "@/store";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { useStore } from "zustand";

const CheckoutPage = () => {
  const { formatNumber } = useNumberFormatter();
  const { push } = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const userId = useStore(userStore, (state) => state.userId);

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
  const totalPrice = cartList?.reduce((acc, item) => acc + item.price, 0) || 0;

  // getting the profile info
  const {
    data: profileInformation,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["fetchProfile", userId],
    queryFn: async () => {
      try {
        const response = await fetchProfileInfo({ id: userId });
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so React Query can handle it.
      }
    },
  });

  const isShippingAvailable =
    profileInformation?.name &&
    profileInformation?.state &&
    profileInformation?.city &&
    profileInformation?.street &&
    profileInformation?.phoneNum;

  // console.log(profileInformation);

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
                    {" "}
                    Name: {profileInformation?.name || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    Email: {profileInformation?.email || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    Zipcode: {profileInformation?.zipcode || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    Street: {profileInformation?.street || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    State: {profileInformation?.state || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    Country: {profileInformation?.country || "-"}
                  </p>
                  <p className="text-sm text-[#43464E]">
                    {" "}
                    Phone: {profileInformation?.phoneNum || "-"}
                  </p>
                </Fragment>
              )}
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
                cartList?.length > 0 &&
                cartList?.map((item) => {
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
                              N{formatNumber(item?.price * 2)}
                            </span>
                            <span className="font-normal">
                              N{formatNumber(item?.price)}
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
                    N{formatNumber(totalPrice * 2)}
                  </span>
                  <span className="font-normal">
                    N{formatNumber(totalPrice)}
                  </span>
                </span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Discount:</span>
                <span className="font-normal">N{formatNumber(totalPrice)}</span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Shipping:</span>
                <span className="font-normal">N{formatNumber(0)}</span>
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
                push("/checkout");
              }}
              className="flex gap-2 items-center py-4 px-8 text-sm mt-5"
            >
              Place order <MoveRight />
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
