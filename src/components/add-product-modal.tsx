"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { notify } from "@/lib/notify";
import { AxiosError } from "axios";
import { LoadingSpinner } from "./ui/loading-spinner";
import { createProduct, updateProduct } from "@/services/product-services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetchProduct: () => void;
  isEdit: boolean;
  productInfo: {
    _id: string;
    pageCount: string;
    price: number;
    isDeleted: boolean;
    __v: number;
  };
}

// Form schema with validation
const formSchema = z.object({
  pageCount: z.string().min(1, { message: "Page count must be at least 1." }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1." }),
});

const AddNewProductModal = ({
  isOpen,
  onClose,
  productInfo,
  refetchProduct,
  isEdit,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageCount: "",
      price: undefined,
    },
  });

  const { setValue } = form;

  // create product
  const { mutate: create, isPending } = useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id?: string;
      body: { pageCount: string; price: number };
    }) => {
      if (isEdit) {
        return await updateProduct({ id: id, data: body });
      }

      return await createProduct(body);
    },
    onSuccess: async () => {
      notify(
        "success",
        `Product ${isEdit ? "Updated" : "Created"} successfully!`
      );
      refetchProduct();
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      await create({
        id: productInfo?._id,
        body: {
          pageCount: values.pageCount,
          price: Number(values.price),
        },
      });

      return;
    }
    await create({
      body: { pageCount: values.pageCount, price: Number(values.price) },
    });
  };

  useEffect(() => {
    if (productInfo) {
      setValue("pageCount", productInfo?.pageCount);
      setValue("price", productInfo?.price);
    }
  }, [setValue, productInfo]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create"} product</DialogTitle>
        </DialogHeader>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-6 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Name fields */}
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Page Count</FormLabel>
                  <FormControl>
                    <Input placeholder="Page count" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col md:flex-row col-span-1 lg:col-span-2 justify-between w-full items-center">
              <Button
                type="button"
                className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending && <LoadingSpinner />} Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProductModal;
