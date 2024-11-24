"use client";
import CountDown from "@/components/countdown";
import PreFooter from "@/components/pre-footer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import AXIOS from "@/lib/axios";
import { notify } from "@/lib/notify";
import { fetchCartList } from "@/services/cart-services";
import { createCartItem } from "@/services/order-services";
import { photoBookStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import { Add, Minus } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { useStore } from "zustand";

export async function UploadMedia(
  file: File | Blob,
  orderId: string,
  pageNo: number
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("orderId", orderId);
  formData.append("pageNo", pageNo as unknown as string);

  return AXIOS.post("pictures", formData);
}

const ProductSummary = () => {
  const { back, push } = useRouter();

  // Access the photoBook state
  const photoBook = useStore(photoBookStore, (state) => state.photoBook);
  const quantity = useStore(photoBookStore, (state) => state.quantity);
  const productId = useStore(photoBookStore, (state) => state.productId);
  const template = useStore(photoBookStore, (state) => state.template);
  const incrementQuantity = useStore(
    photoBookStore,
    (state) => state.incrementQuantity
  );
  const decrementQuantity = useStore(
    photoBookStore,
    (state) => state.decrementQuantity
  );

  const handleDecrement = () => {
    if (quantity === 1) return;
    decrementQuantity();
  };

  const [selectedImage, setSelectedImage] = useState<File>(photoBook[0]);

  // getting cart list items
  const {
    data: cartList,
    // refetch,
    isLoading,
  } = useQuery({
    queryKey: ["fetchCart"],
    queryFn: async () => {
      try {
        const response = await fetchCartList();
        return response?.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: async (
      items: {
        productId: string;
        fullCoverUrl: string;
        frontCoverUrl: string;
        quantity: number;
      }[]
    ) => {
      return await createCartItem(items);
    },
    onSuccess: async (data) => {
      const imgPromises = photoBook.map((image, i) => {
        return UploadMedia(image, data?.data?._id, i + 1);
      });

      try {
        const responses = await Promise.all(imgPromises);
        notify("success", "Order created successfully!");
        push("/cart");
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const onSubmit = async () => {
    const data = [
      ...cartList.items,
      {
        productId: productId,
        quantity: quantity,
        frontCoverUrl: template?.frontCoverUrl,
        fullCoverUrl: template?.fullCoverUrl,
      },
    ];

    const res = await create(data);
  };

  // console.log({ photoBook, productId, template, quantity });

  return (
    <Fragment>
      {/* count down timer */}
      <CountDown />

      <div className="container">
        {/* main page */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:max-w-[95%] mt-8 mx-auto font-hagrid">
          {/* image carousel */}
          <aside className="col-span-1 lg:col-span-3 w-[90%]">
            <div className="mb-6 flex flex-col-reverse items-center gap-[10px]">
              <div className="flex flex-row gap-1 w-full overflow-x-scroll scrollbar-thin py-3 scrollbar-thumb-gray-500 scrollbar-track-transparent">
                {photoBook?.map((image, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(image)}
                      className={clsx(
                        "flex flex-col items-center cursor-pointer !min-w-[100px] !min-h-[60px] justify-center rounded border p-1 hover:border-black",
                        selectedImage === image
                          ? "border-app-black"
                          : "border-neutral-200"
                      )}
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt=""
                        width={100}
                        height={100}
                        className="object-contain h-[100px] !w-[100px]"
                      />
                      <p className="text-xs">Page {i + 1}</p>
                    </div>
                  );
                })}
              </div>

              <div className="inline-flex h-[300px] w-full items-center justify-center px-[15.5px] md:h-[360px] lg:px-[23.68px]">
                {selectedImage instanceof File ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    width={477}
                    height={360}
                    className="!h-full !max-h-[360px] object-contain "
                  />
                ) : (
                  <p>No image selected</p>
                )}
              </div>
            </div>
          </aside>

          {/* other product order info */}
          <aside className="h-auto col-span-1 lg:col-span-2 p-8 border border-black border-opacity-15">
            <h6 className="text-sm font-bold text-[#3b3b3b] uppercase">
              Great choice! You will love it!
            </h6>

            {/* options */}
            <h3 className="mb-6 font-bold text-3xl">Your selected options:</h3>

            <p className="flex w-full text-base">
              <span className="font-bold py-2 px-3 w-full border border-black border-opacity-15">
                Cover Type
              </span>
              <span className="font-normal flex py-2 px-3 w-full place-self-end border border-black border-opacity-15">
                Hardcover
              </span>
            </p>

            <p className="flex w-full text-base">
              <span className="font-bold py-2 px-3 w-full border border-black border-opacity-15">
                Size
              </span>
              <span className="font-normal flex py-2 px-3 w-full place-self-end border border-black border-opacity-15">
                11.5&apos;&apos; x 8.5&apos;&apos; Vertical
              </span>
            </p>

            <p className="flex w-full text-base">
              <span className="font-bold py-2 px-3 w-full border border-black border-opacity-15">
                Paper finish
              </span>
              <span className="font-normal flex py-2 px-3 w-full place-self-end border border-black border-opacity-15">
                Matte laminate
              </span>
            </p>

            {/* <p className="flex w-full text-base">
            <span className="font-bold py-2 px-3 w-full border border-black border-opacity-15">
              Template
            </span>
            <span className="font-normal flex py-2 px-3 w-full place-self-end border border-black border-opacity-15">
              Dubai 1
            </span>
          </p> */}

            {/* cover types and paper finishes */}
            <div className="my-6 py-6 border-dashed border-y border-black border-opacity-15 grid grid-cols-2 gap-2">
              <div className="flex flex-col col-span-1">
                <p className="text-sm text-[rgba(0, 0, 0, .6)] uppercase font-bold">
                  Cover type
                </p>
                <div className="border-2 border-black rounded-md h-full">
                  <Image
                    src="/hardcover.png"
                    alt="hard cover"
                    width={231.72}
                    height={160}
                    className="rounded-t-md"
                  />
                  <p className="text-center text-lg font-bold mb-2.5">
                    Hardcover
                  </p>
                  <p className="text-center text-[rgba(24, 20, 20, .56)] text-xs px-2 font-medium mb-2.5">
                    2.5mm thick
                  </p>
                </div>
              </div>

              <div className="flex flex-col col-span-1">
                <p className="text-sm text-[rgba(0, 0, 0, .6)] uppercase font-bold">
                  Paper finish
                </p>
                <div className="border-2 border-black rounded-md">
                  <Image
                    src="/matte-paper.png"
                    alt="paper finish"
                    width={231.72}
                    height={160}
                    className="rounded-t-md"
                  />
                  <p className="text-center text-lg font-bold mb-2.5">
                    Matte laminate
                  </p>
                  <p className="text-center text-[rgba(24, 20, 20, .56)] text-xs px-2 font-medium mb-2.5">
                    Premium smooth paper with a subtle gloss, perfect for
                    showcasing photos.
                  </p>
                </div>
              </div>
            </div>

            {/* number of products */}
            <div className="flex justify-between gap-2 mb-6">
              <span className="font-bold text-base text-black">Total: </span>
              <span className="font-bold text-base text-black">
                24 Pages for N 32.99
              </span>
            </div>

            {/* buttons */}
            <div className="flex gap-2 items-center">
              <div className="flex items-center border-2 border-black rounded-md h-full">
                <button onClick={handleDecrement} className="p-3">
                  <Minus size="20" color="#000000" />
                </button>
                <p className="p-3 font-bold">{quantity}</p>
                <button onClick={incrementQuantity} className="p-3">
                  <Add size="20" color="#000000" />
                </button>
              </div>

              <Button
                onClick={() => {
                  onSubmit();
                }}
                disabled={isPending}
                className="text-[#F1F0ED] w-[70%] h-full bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
              >
                {isPending && <LoadingSpinner />} Add To Cart
              </Button>
            </div>

            {/* random texts */}
            <div className="flex items-center mt-4 text-sm font-bold justify-center">
              <span className="border-r px-[10px]">High quality</span>
              <span className="border-r px-[10px]">2 year warranty</span>
              <span className=" px-[10px]">Fast shipping</span>
            </div>
          </aside>
        </section>

        <div className="w-full my-6 p-3">
          <Button
            onClick={() => {
              back();
            }}
            className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
          >
            Back
          </Button>
        </div>
      </div>

      {/* pre footer */}
      <PreFooter />
    </Fragment>
  );
};

export default ProductSummary;
