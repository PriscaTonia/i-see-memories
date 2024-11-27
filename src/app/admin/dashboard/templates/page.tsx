"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { fetchTemplateList } from "@/services/product-services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Templates = () => {
  const {
    data,
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

  if (TemplatesError) {
    return (
      <div className="p-6 lg:p-10 w-full flex gap-3 justify-center items-center min-h-[60vh] ">
        <p className="text-lg"> Error loading products.</p>

        <Button
          onClick={() => {
            refetchTemplates();
          }}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Refetch Templates!
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <div className="flex justify-between gap-3 w-full">
        <h2 className="text-lg lg:text-xl font-bold">Products</h2>

        <Button
          onClick={() => {}}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Add Products
        </Button>
      </div>

      {isTemplatesLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      )}

      {!isTemplatesLoading && data?.length < 1 && (
        <div className="flex justify-center items-center min-h-[60vh]">
          No Products Created Yet!
        </div>
      )}

      {!isTemplatesLoading && data?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {data?.map((p, i) => {
            return (
              <div
                key={p?._id}
                className="p-4 border border-black rounded-md flex flex-col gap-3 lg:min-w-[30%]"
              >
                <p className="text-sm font-bold">Template {i + 1} </p>

                <div className="flex flex-col gap-1">
                  <p className="text-lg flex items-center justify-between gap-4">
                    {p?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Templates;
