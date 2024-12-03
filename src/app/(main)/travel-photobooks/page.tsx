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

import React, { useState, useEffect } from "react";
import Questions from "@/components/questions";
import CreatePhotoBookSteps from "@/components/create-photobook-steps";
import Reviews from "@/components/reviews";
import PreFooter from "@/components/pre-footer";
import BeautifulMoments from "@/components/beautiful-moments";
import { useRouter } from "next/navigation";
import useNumberFormatter from "@/utils/useNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductList,
  fetchTemplateList,
} from "@/services/product-services";
import { photoBookStore } from "@/store";
import { useStore } from "zustand";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { getUser } from "@/lib/session";
import CustomizeTemplateModal from "@/components/customize-template-modal";

const TravelPhotoBook = () => {
  const { push } = useRouter();
  const { formatNumber } = useNumberFormatter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const [carouselImages, setCarouselImages] = useState<string[]>([
    "/img2.webp",
    "/img3.webp",
  ]);

  const isUserLoggedIn = async () => {
    const isLoggedIn = await getUser();

    if (!isLoggedIn) {
      push("/auth/sign-in");
      return;
    } else {
      push(`/travel-photobooks/select-photos?pages=${selectedPage?.pageCount}`);
    }
  };

  const setProductId = useStore(photoBookStore, (state) => state.setProductId);
  const setTemplate = useStore(photoBookStore, (state) => state.setTemplateId);
  const setProduct = useStore(photoBookStore, (state) => state.setProduct);

  const title = useStore(photoBookStore, (state) => state.title);
  const subTitle = useStore(photoBookStore, (state) => state.subTitle);
  const color = useStore(photoBookStore, (state) => state.color);

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

  const {
    data: templatesList,
    isLoading: isTemplatesLoading,
    refetch: refetchTemplates,
    error: TemplatesError,
  } = useQuery({
    queryKey: ["fetchTemplates"],
    queryFn: async () => {
      try {
        const response = await fetchTemplateList();
        return response?.data;
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  const loading = isProductsLoading || isTemplatesLoading;

  const [selectedPage, setSelectedPage] = useState<{
    _id: string;
    pageCount: number;
    price: number;
  }>(data?.[0]);

  const [selectedTemplate, setSelectedTemplate] = useState<{
    _id: string;
    frontCover: string;
    fullCover: string;
    name: string;
    isDeleted: boolean;
  }>(templatesList?.[0]);

  useEffect(() => {
    setProductId(selectedPage?._id);
    setProduct({
      pageCount: selectedPage?.pageCount,
      price: selectedPage?.price,
    });
    setTemplate({
      frontCoverUrl: selectedTemplate?.frontCover,
      fullCoverUrl: selectedTemplate?.fullCover,
    });
  }, [
    setProduct,
    setProductId,
    setTemplate,
    selectedPage,
    selectedTemplate?.frontCover,
    selectedTemplate?.fullCover,
    selectedPage?.pageCount,
    selectedPage?.price,
  ]);

  useEffect(() => {
    // Update carousel images whenever the selected template changes
    if (selectedTemplate) {
      const newImages = [
        selectedTemplate?.frontCover,
        "/img2.webp",
        "/img3.webp",
        selectedTemplate?.fullCover,
      ];
      setCarouselImages(newImages);
    }
  }, [selectedTemplate]);

  if (loading)
    return (
      <div className="p-6 lg:p-10 w-full flex justify-center items-center min-h-[60vh] ">
        <LoadingSpinner />
      </div>
    );

  if (ProductsError || TemplatesError)
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading products.</p>

        <Button
          onClick={() => {
            refetchProducts();
            refetchTemplates();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch Page!
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col font-hagrid">
      {/* count down timer */}
      <CountDown />

      <div className="container flex flex-col ">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-9 lg:max-w-[90%] gap-8 mx-auto">
          {/* image carousel */}
          <div className="col-span-1">
            <ImageCarousel images={carouselImages} />
          </div>

          {/* product content */}
          <div className="col-span-1 p-8 flex flex-col gap-3 border border-black rounded h-fit">
            <h2 className="font-bold text-[30px] leading-[41.6px] mb-2">
              Custom Travel Book
            </h2>

            <h5 className="flex gap-3 items-center font-bold text-lg">
              {selectedPage?.pageCount || 0} Pages for N
              {formatNumber(selectedPage?.price || 0)}
              <span className="font-normal line-through">
                N
                {selectedPage?.price
                  ? formatNumber(selectedPage?.price * 2)
                  : formatNumber(0)}
              </span>
              <span className="bg-black text-white px-3 py-[2px] rounded-[36px]">
                50% off
              </span>
            </h5>

            <p className="py-6 my-6 border-y border-dashed border-[#6e6d6b]">
              Choose your template, and design your custom travel book in under
              10 minutes! All templates are fully customisable.
            </p>

            <p className="text-sm mb-2 text-[#6e6d6b] font-semibold">
              Choose your cover template and customize your book title and color
            </p>

            <Select
              onValueChange={(value) =>
                setSelectedTemplate(
                  templatesList?.find((p) => p?._id === value) ||
                    templatesList[0]
                )
              }
              value={selectedTemplate?._id}
            >
              <SelectTrigger className="flex justify-center border-[2px] py-5 px-[56px] min-h-[68px] focus:outline-none focus:ring-0 rounded-md border-black">
                <SelectValue
                  className="text-base lg:text-lg font-bold font-hagrid"
                  placeholder="Select template cover"
                />
              </SelectTrigger>
              <SelectContent>
                {templatesList &&
                  templatesList?.map((t) => {
                    return (
                      <SelectItem
                        key={t?._id}
                        className="text-base lg:text-lg font-bold capitalize font-hagrid"
                        value={t?._id}
                      >
                        {t?.name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>

            {selectedTemplate && (
              <Button onClick={openDialog}>Customize Your Template</Button>
            )}

            <p className="text-sm mb-2 text-[#6e6d6b] font-semibold">
              Choose the number of pages for your photobook
            </p>

            <Select
              onValueChange={(value) =>
                setSelectedPage(data?.find((p) => p?._id === value) || data[0])
              }
              value={selectedPage?._id}
            >
              <SelectTrigger className="flex justify-center border-[2px] py-5 px-[56px] min-h-[68px] focus:outline-none focus:ring-0 rounded-md border-black">
                <SelectValue
                  className="text-base lg:text-lg font-bold font-hagrid"
                  placeholder="Select number of pages"
                />
              </SelectTrigger>
              <SelectContent>
                {data &&
                  data?.map((p) => {
                    return (
                      <SelectItem
                        key={p?._id}
                        className="text-base lg:text-lg font-bold font-hagrid"
                        value={p?._id}
                      >
                        {p?.pageCount} Pages
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                if (!selectedPage || !selectedTemplate) {
                  notify("error", "Select a template and number of pages");
                  return;
                }

                if (!title || !subTitle || !color) {
                  notify(
                    "error",
                    "Customize your template and select a color for your cover"
                  );
                  return;
                }

                isUserLoggedIn();
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
      </div>

      <CreatePhotoBookSteps />
      <Reviews />
      <BeautifulMoments />
      <PreFooter />

      {/* Dialog */}
      <CustomizeTemplateModal isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default TravelPhotoBook;
