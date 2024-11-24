"use client";
import React, { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import ImageUploader from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import ImageBookPreview from "@/components/image-preview";
import clsx from "clsx";
import { useStore } from "zustand";
import { photoBookStore } from "@/store";

const SelectPhotos = () => {
  const { push } = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imageThings, setimageThings] = useState<
    { file: File; pageNo: number }[]
  >([]);

  const [view, setView] = useState<string>("image-upload");

  const searchParams = useSearchParams();
  const page = searchParams.get("pages");
  const max_num_page = Number(page) - 2;
  const remainingLength = max_num_page - images?.length;

  // Access the photoBook state and updatePhotoBooks action
  const photoBook = useStore(photoBookStore, (state) => state.photoBook);

  const updatePhotoBooks = useStore(
    photoBookStore,
    (state) => state.updatePhotoBooks
  );

  const handleUpload = (newImages: File[]) => {
    updatePhotoBooks(newImages); // Call the update function with new images
  };

  useEffect(() => {
    if (photoBook?.length > 0) {
      setImages(photoBook);
    }
  }, [photoBook]);

  useEffect(() => {
    const imageThings = images.map((x, i) => ({ file: x, pageNo: i + 1 }));
    setimageThings(imageThings);
  }, [images]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="flex flex-col font-hagrid px-4 pt-10 pb-4 bg-[#f3f3f3]">
        <div className=" w-full bg-white min-h-[80vh] ">
          <div className="container px-4 pt-20 pb-4 mx-auto flex flex-col gap-6">
            <div className="w-full flex gap-3 justify-end items-center">
              {images?.length < max_num_page && (
                <p className="text-lg text-red-600 font-bold">
                  {remainingLength} more{" "}
                  {remainingLength === 1 ? "picture" : "pictures"} to go!
                </p>
              )}

              {view === "preview" && (
                <Button
                  onClick={() => {
                    handleUpload(images);
                    push(`/travel-photobooks/product-summary`);
                  }}
                  className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
                >
                  Place order
                </Button>
              )}
              {images?.length === max_num_page && (
                <Button
                  onClick={() => {
                    if (view === "image-upload") {
                      setView("preview");
                    } else {
                      setView("image-upload");
                    }
                  }}
                  variant="outline"
                  className={clsx(
                    view === "preview"
                      ? "text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
                      : "text-[#000000] border-black hover:bg-black hover:text-[#F1F0ED] rounded-md font-bold text-lg py-5 px-10"
                  )}
                >
                  {view === "image-upload" ? "Proceed" : "Edit"}
                </Button>
              )}
            </div>

            {view === "preview" && <ImageBookPreview images={imageThings} />}

            {view === "image-upload" && (
              <ImageUploader
                max_num_page={max_num_page}
                images={images}
                setImages={setImages}
              />
            )}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default SelectPhotos;
