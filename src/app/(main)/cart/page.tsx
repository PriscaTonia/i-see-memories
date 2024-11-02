"use client";

import EmptyCartView from "@/components/empty-cart-view";
import PreFooter from "@/components/pre-footer";
import { photoBookStore } from "@/store";
import { Add, Minus } from "iconsax-react";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { MoveRight, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useStore } from "zustand";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { formatNumber } = useNumberFormatter();
  const { push } = useRouter();

  const orderNo = useStore(photoBookStore, (state) => state.orderNo);
  const incrementOrderNo = useStore(
    photoBookStore,
    (state) => state.incrementOrderNo
  );
  const decrementOrderNo = useStore(
    photoBookStore,
    (state) => state.decrementOrderNo
  );

  const handleDecrement = () => {
    if (orderNo === 1) return;
    decrementOrderNo();
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10 min-h-[60vh] font-hagrid container">
      <h1 className="font-bold text-[26px]">Cart</h1>

      {/* empty cart view */}
      {cart_data?.length < 1 && <EmptyCartView />}

      {cart_data?.length > 0 && (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {/* cart */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-2">
            {cart_data?.map((item) => {
              return (
                <div
                  key={item?.name}
                  className="flex gap-3 p-5 border rounded justify-between"
                >
                  {/* item image */}
                  <Image
                    src={item?.image}
                    alt="Cart item image"
                    width={160}
                    height={160}
                  />

                  {/* item details */}
                  <div className="flex flex-col">
                    <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
                      {item?.name}
                      <span className="flex gap-2 items-center">
                        <span className="font-normal line-through">
                          N{formatNumber(item?.price)}
                        </span>
                        <span className="font-normal">
                          N{formatNumber(item?.discounted_price)}
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
                  <div className="flex flex-col justify-between items-end">
                    <Trash2 className="cursor-pointer" />

                    <div className="flex items-center border-2 border-black rounded-md ">
                      <button onClick={handleDecrement} className="p-3">
                        <Minus size="20" color="#000000" />
                      </button>
                      <p className="p-3 font-bold">{orderNo}</p>
                      <button onClick={incrementOrderNo} className="p-3">
                        <Add size="20" color="#000000" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* summary */}
          <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
            <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
              Summary
            </h3>

            <p className="flex text-sm lg:text-base justify-between items-center">
              <span className="text-xs lg:text-sm">CART TOTAL:</span>

              <span className="flex gap-2 items-center">
                <span className="font-normal line-through">
                  N{formatNumber(115000)}
                </span>
                <span className="font-normal">N{formatNumber(62000)}</span>
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

const cart_data = [
  {
    image: "/cart_item.png",
    name: "Custom Photobook 78989",
    price: 115.98,
    discounted_price: 69.2,
    quantity: 2,
  },
];
