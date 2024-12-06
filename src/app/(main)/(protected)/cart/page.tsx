"use client";

import EmptyCartView from "@/components/empty-cart-view";
import PreFooter from "@/components/pre-footer";
import { Add, Minus } from "iconsax-react";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { MoveRight, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCartList } from "@/services/cart-services";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { createCartItem } from "@/services/order-services";
import clsx from "clsx";
import { getUser } from "@/lib/session";

const CartPage = () => {
  const { formatNumber } = useNumberFormatter();
  const { push } = useRouter();
  const [logged, setLogged] = useState(false);

  const isUserLoggedIn = async () => {
    const isLoggedIn = await getUser();

    if (isLoggedIn) {
      setLogged(true);
      return;
    }

    setLogged(false);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const {
    data: cartList,
    refetch: CartRefetch,
    error: CartError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchCart"],
    queryFn: async () => {
      try {
        const response = await fetchCartList();
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  // update cart items
  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: async (
      items: {
        productId: string;
        fullCoverUrl: string;
        frontCoverUrl: string;
        quantity: number;
        title?: string;
        subTitle?: string;
        color?: string;
        _id?: string;
      }[]
    ) => {
      return await createCartItem(items);
    },
    onSuccess: async () => {
      notify("success", "Cart updated successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const [cartState, setCartState] = useState(cartList?.items || []);
  const [id, setId] = useState("");

  // update quantity
  const handleQuantityChange = (itemId, newQuantity) => {
    setId(itemId);

    const updatedCart = cartState.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartState(updatedCart);

    // Call the mutation with the updated cart
    updateCart(
      updatedCart?.map((c) => ({
        productId: c?.productId?._id,
        fullCoverUrl: c?.fullCoverUrl,
        frontCoverUrl: c?.frontCoverUrl,
        quantity: c?.quantity,
        title: c?.title,
        subTitle: c?.subTitle,
        color: c?.color,
        _id: c?._id,
      }))
    );

    setId("");
  };

  // delete cart item
  const handleDeleteItem = (itemId) => {
    setId(itemId);
    const updatedCart = cartState.filter((item) => item._id !== itemId);
    setCartState(updatedCart);

    // Call the delete mutation
    updateCart(
      updatedCart?.map((c) => ({
        productId: c?.productId?._id,
        fullCoverUrl: c?.fullCoverUrl,
        frontCoverUrl: c?.frontCoverUrl,
        quantity: c?.quantity,
        title: c?.title,
        subTitle: c?.subTitle,
        color: c?.color,
        _id: c?._id,
      }))
    );
    setId("");
  };

  const totalPrice =
    cartState?.reduce(
      (acc, item) => acc + item?.productId?.price * item?.quantity,
      0
    ) || 0;

  useEffect(() => {
    setCartState(cartList?.items);
  }, [cartList?.items]);

  // cart items loading
  if (isLoading)
    return (
      <div className="p-6 lg:p-10 w-full flex justify-center items-center min-h-[60vh] ">
        <LoadingSpinner />
      </div>
    );

  // cart error
  if (CartError)
    // console.log({ CartError });

    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading cart items.</p>

        <Button
          onClick={() => {
            CartRefetch();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch Cart!
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10 min-h-[60vh] font-hagrid container">
      <h1 className="font-bold text-[26px] w-full flex justify-between">
        Cart <span>{isPending && <LoadingSpinner />}</span>
      </h1>

      {/* empty cart view */}
      {!isLoading && (cartState?.length < 1 || cartList === null) && (
        <EmptyCartView isLoggedIn={logged} />
      )}

      {!isLoading && cartState?.length > 0 && (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {/* cart */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-2">
            {cartState?.map((item) => {
              return (
                <div
                  key={item?._id}
                  className="flex gap-3 p-3 lg:p-5 border rounded "
                >
                  {/* item image */}
                  <Image
                    src={item?.frontCoverUrl || "/img1.webp"}
                    alt="Cart item image"
                    width={160}
                    height={160}
                  />

                  <section className="flex flex-col lg:flex-row gap-2 sm:gap-3 justify-between w-full">
                    {/* item details */}
                    <div className="flex flex-col">
                      <h3 className="font-bold flex flex-col text-base lg:text-xl text-[#43464E]">
                        {item?.name || "Custom Photo Book"}
                        <span className="flex gap-2 items-center">
                          <span className="font-normal line-through">
                            ₦
                            {formatNumber(
                              item?.productId?.price * item?.quantity * 2 || 0
                            )}
                          </span>
                          <span className="font-normal">
                            ₦
                            {formatNumber(
                              item?.productId?.price * item?.quantity || 0
                            )}
                          </span>
                        </span>
                      </h3>

                      <p className="text-sm lg:text-base mt-4">
                        Cover Type: Hardcover
                      </p>
                      <p className="text-sm lg:text-base">
                        Size: 11.5&apos;&apos; x 8.5&apos;&apos; Vertical
                      </p>
                      <p className="text-sm lg:text-base">
                        Paper Finish: Gloss Paper
                      </p>
                    </div>

                    {/* buttons */}
                    <div className="flex flex-row gap-2 items-center lg:flex-col justify-between lg:items-end">
                      <button
                        disabled={isPending}
                        onClick={() => handleDeleteItem(item?._id)}
                      >
                        <Trash2 className="cursor-pointer" />
                      </button>

                      <div className="flex items-center border-2 border-black rounded-md ">
                        <button
                          onClick={() => {
                            if (item?.quantity === 1)
                              return notify(
                                "error",
                                "Cart item cannot be less than 1"
                              );
                            handleQuantityChange(item?._id, item?.quantity - 1);
                          }}
                          disabled={isPending}
                          className={clsx(
                            "p-1 lg:p-3",
                            isPending && "cursor-not-allowed"
                          )}
                        >
                          <Minus size="20" color="#000000" />
                        </button>
                        <p className="p-1 lg:p-3 font-bold">
                          {isPending && id === item?._id ? (
                            <LoadingSpinner />
                          ) : (
                            item?.quantity
                          )}
                        </p>
                        <button
                          onClick={() => {
                            handleQuantityChange(item?._id, item?.quantity + 1);
                          }}
                          disabled={isPending}
                          className={clsx(
                            "p-1 lg:p-3",
                            isPending && "cursor-not-allowed"
                          )}
                        >
                          <Add size="20" color="#000000" />
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              );
            })}
          </div>

          {/* summary */}
          <div className="col-span-1 h-fit flex flex-col gap-3 border rounded p-5">
            <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
              Summary
            </h3>

            <p className="flex text-sm lg:text-base justify-between items-center">
              <span className="text-xs lg:text-sm">CART TOTAL:</span>

              <span className="flex gap-2 items-center">
                <span className="font-normal line-through">
                  ₦{formatNumber(totalPrice * 2)}
                </span>
                <span className="font-normal">N{formatNumber(totalPrice)}</span>
              </span>
            </p>

            <Button
              onClick={() => push("/checkout")}
              className="flex gap-2 items-center py-4 px-8 text-sm mt-5"
            >
              Go to checkout <MoveRight />
            </Button>
          </div>
        </section>
      )}

      <PreFooter />
    </div>
  );
};

export default CartPage;
