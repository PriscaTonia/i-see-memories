"use client";
import AddNewShippingAddress from "@/components/add-new-shipping-address";
import { Button } from "@/components/ui/button";
import { TickCircle } from "iconsax-react";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

const Addresses = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="flex flex-col px-6 font-hagrid">
      <div className="flex flex-col gap-6">
        <Button
          type="button"
          className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
          onClick={openDialog}
        >
          Add New
        </Button>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div
            onClick={() => {}}
            className="border p-4 cursor-pointer border-black col-span-1 flex flex-col"
          >
            <p className="text-sm text-[#43464E] flex justify-between pb-3 w-full gap-2">
              Prisca Tonia{" "}
              <span>
                <TickCircle size="20" color="#000000" variant="Bold" />
              </span>
            </p>
            <p className="text-sm text-[#43464E]">400104</p>
            <p className="text-sm text-[#43464E]">Enugu</p>
            <p className="text-sm text-[#43464E] flex justify-between w-full gap-2">
              09012332415{" "}
              <span className="cursor-pointer" onClick={() => {}}>
                <Pencil size={20} />
              </span>
            </p>
          </div>
        </section>
      </div>

      {/* Add new address Dialog */}
      <AddNewShippingAddress isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default Addresses;
