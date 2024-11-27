"use client";
import AddNewProductModal from "@/components/add-product-modal";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { deleteProduct, fetchProductList } from "@/services/product-services";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const Products = () => {
  const { formatNumber } = useNumberFormatter();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const [product, setProduct] = useState<null | {
    _id: string;
    pageCount: string;
    price: number;
    isDeleted: boolean;
    __v: number;
  }>(null);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const {
    data,
    isLoading: isProductsLoading,
    error: ProductsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: async () => {
      try {
        const response = await fetchProductList();
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  // delete product
  const { mutate: deleteP, isPending } = useMutation({
    mutationFn: async ({ id }: { id?: string }) => {
      return await deleteProduct({ id });
    },
    onSuccess: async () => {
      notify("success", `Product Deleted successfully!`);
      setDeletedId("");
      refetchProducts();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  // products error
  if (ProductsError) {
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading products.</p>

        <Button
          onClick={() => {
            refetchProducts();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch Page!
        </Button>
      </div>
    );
  }

  // console.log(data);

  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <div className="flex justify-between gap-3 w-full">
        <h2 className="text-lg lg:text-xl font-bold">Products</h2>

        <Button
          onClick={openDialog}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Add Products
        </Button>
      </div>

      {isProductsLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      )}

      {!isProductsLoading && data?.length < 1 && (
        <div className="flex justify-center items-center min-h-[60vh]">
          No Products Created Yet!
        </div>
      )}

      {!isProductsLoading && data?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {data?.map((p, i) => {
            return (
              <div
                key={p?._id}
                className="p-4 border border-black rounded-md flex flex-col gap-3 lg:min-w-[30%]"
              >
                <p className="text-sm font-bold">Product {i + 1} </p>

                <div className="flex flex-col gap-1">
                  <p className="text-lg flex items-center justify-between gap-4">
                    <span>Page Count: </span> <span>{p?.pageCount}</span>
                  </p>
                  <p className="text-lg flex items-center justify-between gap-4">
                    <span>Price: </span> <span>N{formatNumber(p?.price)}</span>
                  </p>
                  <div className="flex gap-3 mt-3">
                    <Button
                      onClick={() => {
                        setEdit(true);
                        setProduct(p);
                        openDialog();
                      }}
                      className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-2 px-4"
                    >
                      Edit
                    </Button>

                    <button
                      disabled={isPending}
                      onClick={() => {
                        setDeletedId(p?._id);
                        deleteP({ id: p?._id });
                      }}
                    >
                      {isPending && deletedId === p?._id ? (
                        <LoadingSpinner />
                      ) : (
                        <Trash2 className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dialog */}
      <AddNewProductModal
        refetchProduct={refetchProducts}
        isOpen={isDialogOpen}
        onClose={() => {
          setEdit(false);
          setProduct(null);
          closeDialog();
        }}
        isEdit={edit}
        productInfo={product}
      />
    </div>
  );
};

export default Products;
