"use client";
import CountDown from "@/components/countdown";
import ImageCarousel from "@/components/image-carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import Questions from "@/components/questions";
import CreatePhotoBookSteps from "@/components/create-photobook-steps";
import Reviews from "@/components/reviews";
import PreFooter from "@/components/pre-footer";
import BeautifulMoments from "@/components/beautiful-moments";
import { useRouter } from "next/navigation";
import useNumberFormatter from "@/utils/useNumberFormatter";

const TravelPhotoBook = () => {
  const { push } = useRouter();
  const { formatNumber } = useNumberFormatter();

  const [selectedPage, setSelectedPage] = useState<{
    id: string;
    page: number;
    price: number;
  }>(pages[0]);

  console.log(selectedPage);

  return (
    <div className="flex flex-col font-hagrid">
      {/* count down timer */}
      <CountDown />

      <div className="grid grid-cols-1 lg:grid-cols-2 py-9 lg:max-w-[90%] gap-8 mx-auto">
        {/* image carousel */}
        <div className="col-span-1">
          <ImageCarousel images={defaultImages} />
        </div>

        {/* product content */}
        <div className="col-span-1 p-8 flex flex-col gap-3 border border-black rounded h-fit">
          <h2 className="font-bold text-[30px] leading-[41.6px] mb-2">
            Custom Travel Book
          </h2>

          <h5 className="flex gap-3 items-center font-bold text-lg">
            {selectedPage.page} Pages for N{formatNumber(selectedPage.price)}
            <span className="font-normal line-through">
              N{formatNumber(0.5 * selectedPage.price)}
            </span>
            <span className="bg-black text-white px-3 py-[2px] rounded-[36px]">
              50% off
            </span>
          </h5>
          {/* <p className="text-xs text-[#6e6d6b]">
            After that just $0.99 per page
          </p> */}

          <p className="py-6 my-6 border-y border-dashed border-[#6e6d6b]">
            Choose your template or start from scratch, and design your custom
            travel book in under 10 minutes! All templates are fully
            customisable in the editor.
          </p>

          <p className="text-sm mb-2 text-[#6e6d6b] font-semibold">
            Choose your cover template or start from scratch
          </p>

          <Select>
            <SelectTrigger className="flex justify-center border-[2px] py-5 px-[56px] min-h-[68px] focus:outline-none rounded-md border-black">
              <SelectValue
                className="text-lg font-bold font-hagrid"
                placeholder="Select template cover"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-base font-bold font-hagrid"
                value="dubai"
              >
                Dubai 1
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="text-sm mb-2 text-[#6e6d6b] font-semibold">
            Choose the number of pages for your photobook
          </p>

          <Select
            onValueChange={(value) =>
              setSelectedPage(pages.find((p) => p.id === value) || pages[0])
            }
          >
            <SelectTrigger className="flex justify-center border-[2px] py-5 px-[56px] min-h-[68px] focus:outline-none rounded-md border-black">
              <SelectValue
                className="text-lg font-bold font-hagrid"
                placeholder="Select number of pages"
              />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => {
                return (
                  <SelectItem
                    key={page.id}
                    className="text-base font-bold font-hagrid"
                    value={page.id}
                  >
                    {page.page} Pages
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              push(
                `/travel-photobooks/select-photos?pages=${selectedPage.page}`
              );
            }}
            variant="outline"
            className="text-[#000000] border-black hover:bg-black hover:text-[#F1F0ED] rounded-md min-h-[68px] font-bold text-lg py-5 px-[56px]"
          >
            Start My Design
          </Button>

          <div className="flex items-center text-sm font-bold justify-center">
            <span className="border-r px-[10px]">High quality</span>
            <span className="border-r px-[10px]">2 year warranty</span>
            <span className=" px-[10px]">Fast shipping</span>
          </div>
        </div>
      </div>

      {/* questions */}
      <Questions />

      <CreatePhotoBookSteps />
      <Reviews />
      <BeautifulMoments />
      <PreFooter />
    </div>
  );
};

export default TravelPhotoBook;

const defaultImages = ["/img1.webp", "/img2.webp", "/img3.webp", "/img4.webp"];
const pages = [
  {
    id: "1",
    page: 52,
    price: 80000,
  },
  {
    id: "2",
    page: 100,
    price: 120000,
  },
  {
    id: "3",
    page: 152,
    price: 160000,
  },
];
