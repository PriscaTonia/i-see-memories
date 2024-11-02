"use client";
import { Button } from "@/components/ui/button";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { MoveRight, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const { formatNumber } = useNumberFormatter();
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10 min-h-[60vh] font-hagrid container">
      <h1 className="font-bold text-[26px] text-[#203343]">Checkout</h1>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {/* address and payment methods container */}
        <div className="flex flex-col gap-3 col-span-1 lg:col-span-2">
          {/* address */}
          <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
            <h3 className="font-bold flex justify-between w-full text-xl text-[#43464E]">
              Shipping Address
              <span className="cursor-pointer">
                <Pencil />
              </span>
            </h3>

            <p className="text-sm text-[#43464E]">Prisca Tonia</p>
            <p className="text-sm text-[#43464E]">400104</p>
            <p className="text-sm text-[#43464E]">Enugu</p>
            <p className="text-sm text-[#43464E]">09012332415</p>
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
        <div className="col-span-1 flex flex-col gap-3 border rounded p-5">
          <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
            Summary
          </h3>

          <p className="flex text-sm lg:text-base justify-between items-center">
            <span className="text-xs lg:text-sm">Subtotal:</span>

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
            Place order <MoveRight />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
