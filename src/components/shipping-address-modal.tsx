"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TickCircle } from "iconsax-react";
import { Pencil } from "lucide-react";
import { Fragment, useState } from "react";
import AddNewShippingAddress from "./add-new-shipping-address";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShippingAddressModal = ({ isOpen, onClose }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
          <DialogHeader>
            <DialogTitle>Select Shipping Address</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            <Button
              type="button"
              className="border border-black text-black w-fit bg-white"
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

          <DialogFooter className="flex justify-between w-full items-center">
            <Button
              type="button"
              className="border border-black bg-white text-black"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="button" onClick={onClose}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add new address Dialog */}
      <AddNewShippingAddress isOpen={isDialogOpen} onClose={closeDialog} />
    </Fragment>
  );
};

export default ShippingAddressModal;
