import React from "react";
import Image from "next/image";

interface Props {
  images: { file: File; pageNo: number }[];
}

const ImageBookPreview = ({ images }: Props) => {
  // Split images into pairs for left and right pages, starting from Page 2 onward
  const imagesWithoutFirst = images.slice(1);

  const pages: { file: File; pageNo: number }[][] = [];

  for (let i = 0; i < imagesWithoutFirst.length; i += 2) {
    pages.push([imagesWithoutFirst[i], imagesWithoutFirst[i + 1]]);
  }

  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      {/* Cover spread: Front cover and Back cover */}

      <div className="flex border p-2">
        {/* Front cover */}
        <div className="flex flex-col items-center py-2">
          <Image
            src="/img1.webp"
            alt="Front cover"
            width={120}
            height={120}
            className="object-contain w-[120px] h-[120px] rounded-md shadow-md"
          />
          <p className="text-center text-xs mt-2">Front cover</p>
        </div>

        {/* Back cover */}
        <div className="flex flex-col items-center py-2">
          <Image
            src="/img1.webp"
            alt="Back cover"
            width={120}
            height={120}
            className="object-contain w-[120px] h-[120px] rounded-md shadow-md"
          />
          <p className="text-center text-xs mt-2">Back cover</p>
        </div>
      </div>

      {/* Page 1 ("Page not available") and Page 2 (first image) */}
      <div className="flex border p-2">
        {/* Page 1 - "Page not available" */}
        <div className="flex flex-col items-center py-2">
          <div className="w-[120px] h-[120px] bg-gray-100 flex items-center justify-center rounded-md shadow-md">
            <p className="text-center text-xs">Inside Front Cover</p>
          </div>
          {/* <p className="text-center text-xs mt-2">Page 1</p> */}
        </div>

        {/* Page 2 - First image */}
        <div className="flex flex-col items-center py-2">
          {images[0] ? (
            <Image
              src={URL.createObjectURL(images[0].file)}
              alt="Page 2"
              width={120}
              height={120}
              className="object-contain w-[120px] h-[120px] rounded-md shadow-md"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center rounded-md shadow-md">
              <p className="text-center text-xs">Page not available</p>
            </div>
          )}
          <p className="text-center text-xs mt-2">Page {images[0].pageNo}</p>
        </div>
      </div>

      {/* Image pages starting from Page 3 */}
      {pages.map((page, index) => (
        <div key={index} className="flex border p-2">
          {/* Left page in the spread */}
          <div className="flex flex-col items-center py-2">
            {page[0] ? (
              <Image
                src={URL.createObjectURL(page[0].file)}
                alt={`Page ${page[0].pageNo}`}
                width={120}
                height={120}
                className="object-contain w-[120px] h-[120px] rounded-md shadow-md"
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                <p className="text-center text-xs">Page not available</p>
              </div>
            )}
            <p className="text-center text-xs mt-2">Page {page[0].pageNo}</p>
          </div>

          {/* Right page in the spread */}
          <div className="flex flex-col items-center py-2">
            {page[1] ? (
              <Image
                src={URL.createObjectURL(page[1].file)}
                alt={`Page ${page[1].pageNo}`}
                width={120}
                height={120}
                className="object-contain w-[120px] h-[120px] rounded-md shadow-md"
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-100 flex items-center justify-center rounded-md shadow-md">
                <p className="text-center text-xs">Inside Back Cover</p>
              </div>
            )}
            {page[1] ? (
              <p className="text-center text-xs mt-2">Page {page[1]?.pageNo}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageBookPreview;
