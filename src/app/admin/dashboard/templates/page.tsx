"use client";

import AddNewTemplateModal from "@/components/add-template-modal";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notify } from "@/lib/notify";
import { deleteTemplate, fetchTemplateList } from "@/services/product-services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Templates = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const [template, setTemplate] = useState<null | {
    _id: string;
    name: string;
    fullCover: string;
    frontCover: string;
    isDeleted: boolean;
    __v: number;
  }>(null);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

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

  // delete template
  const { mutate: deleteT, isPending } = useMutation({
    mutationFn: async ({ id }: { id?: string }) => {
      return await deleteTemplate({ id });
    },
    onSuccess: async () => {
      notify("success", `Product Deleted successfully!`);
      setDeletedId("");
      refetchTemplates();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
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
        <h2 className="text-lg lg:text-xl font-bold">Templates</h2>

        <Button
          onClick={openDialog}
          className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-5 px-10"
        >
          Add Templates
        </Button>
      </div>

      {isTemplatesLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      )}

      {!isTemplatesLoading && data?.length < 1 && (
        <div className="flex justify-center items-center min-h-[60vh]">
          No Templates Created Yet!
        </div>
      )}

      {!isTemplatesLoading && data?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {data?.map((t, i) => {
            return (
              <div
                key={t?._id}
                className="p-4 border rounded-md flex flex-col gap-3 lg:min-w-[30%]"
              >
                <p className="text-sm font-bold">Template {i + 1} </p>

                <div className="flex flex-col sm:flex-row gap-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-base flex items-center justify-between gap-4">
                      Front cover:
                    </p>
                    <Image
                      src={t?.frontCover}
                      alt=""
                      width={150}
                      height={150}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-base flex items-center justify-between gap-4">
                      Back cover:
                    </p>
                    <Image src={t?.fullCover} alt="" width={150} height={150} />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <p className="text-lg flex items-center justify-between gap-4 font-semibold">
                    {t?.name}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <Button
                      onClick={() => {
                        setEdit(true);
                        setTemplate(t);
                        openDialog();
                      }}
                      className="text-[#F1F0ED] bg-black border-black hover:bg-[#F1F0ED] hover:text-[#000000] rounded-md font-bold text-lg py-2 px-4"
                    >
                      Edit
                    </Button>

                    <button
                      disabled={isPending}
                      onClick={() => {
                        setDeletedId(t?._id);
                        deleteT({ id: t?._id });
                      }}
                    >
                      {isPending && deletedId === t?._id ? (
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
      <AddNewTemplateModal
        refetchTemplate={refetchTemplates}
        isOpen={isDialogOpen}
        onClose={() => {
          setEdit(false);
          setTemplate(null);
          closeDialog();
        }}
        isEdit={edit}
        templateInfo={template}
      />
    </div>
  );
};

export default Templates;
