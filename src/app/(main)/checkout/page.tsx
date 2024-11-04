"use client";
import ShippingAddressModal from "@/components/shipping-address-modal";
import { Button } from "@/components/ui/button";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { MoveRight, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const CheckoutPage = () => {
  const { formatNumber } = useNumberFormatter();
  const { push } = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

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
                <span className="cursor-pointer" onClick={openDialog}>
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
          <aside className="col-span-1 flex flex-col gap-3">
            {/* items */}
            <div className=" flex flex-col gap-3 border rounded p-5">
              <h3 className="font-bold flex flex-col text-xl text-[#43464E]">
                Items
              </h3>

              <div className="flex gap-5">
                {/* item image */}
                <Image
                  src="/cart_item.png"
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
                        N{formatNumber(69)}
                      </span>
                      <span className="font-normal">N{formatNumber(30)}</span>
                    </span>
                  </h3>

                  <p className="text-sm  mt-4">Cover Type: Hardcover</p>
                  <p className="text-sm ">
                    Size: 11.5&apos;&apos; x 8.5&apos;&apos; Vertical
                  </p>
                  <p className="text-sm ">Paper Finish: Gloss Paper</p>
                </div>
              </div>
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
                    N{formatNumber(115000)}
                  </span>
                  <span className="font-normal">N{formatNumber(62000)}</span>
                </span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Discount:</span>
                <span className="font-normal">N{formatNumber(0)}</span>
              </p>

              <p className="flex text-sm lg:text-base justify-between items-center">
                <span className="text-xs lg:text-sm">Shipping:</span>
                <span className="font-normal">N{formatNumber(0)}</span>
              </p>
            </div>

            <Button
              onClick={() => push("/checkout")}
              className="flex gap-2 items-center py-4 px-8 text-sm mt-5"
            >
              Place order <MoveRight />
            </Button>
          </aside>
        </section>
      </div>

      {/* Dialog */}
      <ShippingAddressModal isOpen={isDialogOpen} onClose={closeDialog} />
    </Fragment>
  );
};

export default CheckoutPage;
