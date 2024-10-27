"use client";
import React, { useState } from "react";

import { useSearchParams } from "next/navigation";
import ImageUploader from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import ImageBookPreview from "@/components/image-preview";
import clsx from "clsx";

const SelectPhotos = () => {
  const [images, setImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("pages");
  const max_num_page = Number(page) - 2;

  return (
    <section className="flex flex-col font-hagrid px-4 pt-10 pb-4 bg-[#f3f3f3]">
      <div className=" w-full px-4 pt-20 pb-4 mx-auto bg-white min-h-[80vh] flex flex-col gap-6">
        <div className="w-full flex gap-3 justify-end items-center">
          {showPreview && (
            <Button
              onClick={() => {
                console.log("Added! Yay!");
              }}
              className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
            >
              Add to cart
            </Button>
          )}
          {images?.length === max_num_page && (
            <Button
              onClick={() => {
                if (showPreview) {
                  setShowPreview(false);
                } else {
                  setShowPreview(true);
                }
              }}
              variant="outline"
              className={clsx(
                showPreview
                  ? "text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
                  : "text-[#000000] border-black hover:bg-black hover:text-[#F1F0ED] rounded-md font-bold text-lg py-5 px-10"
              )}
            >
              {!showPreview ? "Proceed" : "Go back"}
            </Button>
          )}
        </div>

        {showPreview ? (
          <ImageBookPreview images={images} />
        ) : (
          <ImageUploader
            max_num_page={max_num_page}
            images={images}
            setImages={setImages}
          />
        )}
      </div>
    </section>
  );
};

export default SelectPhotos;
