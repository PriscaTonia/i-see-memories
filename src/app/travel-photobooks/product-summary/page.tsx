"use client";
import CountDown from "@/components/countdown";
import PreFooter from "@/components/pre-footer";
// import ImageCarousel from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { photoBookStore } from "@/store";
import clsx from "clsx";
import { Add, Minus } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { useStore } from "zustand";

const ProductSummary = () => {
  const { back } = useRouter();
  // Access the photoBook state
  const photoBook = useStore(photoBookStore, (state) => state.photoBook);
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

  const [selectedImage, setSelectedImage] = useState<string>(photoBook[0]);

  console.log({ photoBook });

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
                        src={image}
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
                <Image
                  src={selectedImage}
                  alt=""
                  width={477}
                  height={360}
                  className="!h-full !max-h-[360px] object-contain "
                />
              </div>
            </div>
          </aside>

          {/* other product order info */}
          <aside className="min-h-[100vh] col-span-1 lg:col-span-2 p-8 border border-black border-opacity-15">
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
                <p className="p-3 font-bold">{orderNo}</p>
                <button onClick={incrementOrderNo} className="p-3">
                  <Add size="20" color="#000000" />
                </button>
              </div>

              <Button
                onClick={() => {
                  console.log("Added to cart");
                }}
                className="text-[#F1F0ED] w-[70%] h-full bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
              >
                Add To Cart
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

        <div className="w-full my-6">
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
