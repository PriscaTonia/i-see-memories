"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { AxiosError } from "axios";
import { LoadingSpinner } from "./ui/loading-spinner";
import { createTemplate, updateTemplate } from "@/services/product-services";
import { UploadSingleMedia } from "@/services/media-services";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetchTemplate: () => void;
  isEdit: boolean;
  templateInfo: {
    _id: string;
    name: string;
    fullCover: string;
    frontCover: string;
    isDeleted: boolean;
    __v: number;
  };
}

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Template name is required" }),
});

const AddNewTemplateModal = ({
  isOpen,
  onClose,
  templateInfo,
  isEdit,
  refetchTemplate,
}: Props) => {
  const [frontCover, setFrontCover] = useState<File | null>(null);
  const [fullCover, setFullCover] = useState<File | null>(null);
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { setValue } = form;

  // create product
  const { mutate: create, isPending } = useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id?: string;
      body: { name: string; frontCover: string; fullCover: string };
    }) => {
      if (isEdit) {
        return await updateTemplate({ id: id, data: body });
      }

      return await createTemplate(body);
    },
    onSuccess: async () => {
      notify(
        "success",
        `Template ${isEdit ? "Updated" : "Created"} successfully!`
      );
      refetchTemplate();
      setImgLoading(false);
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      notify("error", message as string);
    },
  });

  const handleImageUpload = async (file: File | null, defaultUrl: string) => {
    if (file) {
      const response = await UploadSingleMedia(file);
      // console.log(response);
      return response?.data?.data.url; // Adjust based on your API's response structure
    }

    return defaultUrl;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImgLoading(true);

    const frontCoverUrl = await handleImageUpload(
      frontCover,
      templateInfo?.frontCover || ""
    );

    const fullCoverUrl = await handleImageUpload(
      fullCover,
      templateInfo?.fullCover || ""
    );

    const body = {
      name: values.name,
      frontCover: frontCoverUrl,
      fullCover: fullCoverUrl,
    };

    // console.log({ frontCoverUrl, fullCoverUrl });

    if (isEdit) {
      await create({
        id: templateInfo?._id,
        body,
      });

      return;
    }
    await create({
      body,
    });
  };

  useEffect(() => {
    if (templateInfo) {
      setValue("name", templateInfo?.name);
    }
  }, [setValue, templateInfo]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setFrontCover(null);
        setFullCover(null);
        onClose();
      }}
    >
      <DialogContent className="max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create"} template</DialogTitle>
        </DialogHeader>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-6 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Front Cover Field */}
            <FormItem className="col-span-1">
              <FormLabel>Front Cover</FormLabel>
              <FormControl>
                <div>
                  {/* Front Cover Preview */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">
                      {isEdit ? "Current Front Cover:" : "Preview Front Cover:"}
                    </p>

                    {frontCover || templateInfo?.frontCover ? (
                      <Image
                        src={
                          frontCover
                            ? URL.createObjectURL(frontCover)
                            : templateInfo?.frontCover
                        }
                        width={100}
                        height={100}
                        alt="Front Cover Preview"
                        className="w-full max-w-[100px] max-h-[100px] rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full max-w-xs h-[100px] border rounded-md bg-gray-100 text-gray-500">
                        No Image Selected
                      </div>
                    )}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFrontCover(e.target.files?.[0] || null)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Full Cover Field */}
            <FormItem className="col-span-1">
              <FormLabel>Full Cover</FormLabel>
              <FormControl>
                <div>
                  {/* Full Cover Preview */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">
                      {isEdit ? "Current Full Cover:" : "Preview Full Cover:"}
                    </p>

                    {fullCover || templateInfo?.fullCover ? (
                      <Image
                        src={
                          fullCover
                            ? URL.createObjectURL(fullCover)
                            : templateInfo?.fullCover
                        }
                        width={100}
                        height={100}
                        alt="Full Cover Preview"
                        className="w-full max-w-[100px] max-h-[100px] rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full max-w-xs h-[100px] border rounded-md bg-gray-100 text-gray-500">
                        No Image Selected
                      </div>
                    )}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFullCover(e.target.files?.[0] || null)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Template Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Template name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col md:flex-row col-span-1 lg:col-span-2 justify-between w-full items-center">
              <Button
                type="button"
                className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
                onClick={() => {
                  setFrontCover(null);
                  setFullCover(null);
                  onClose();
                }}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending || imgLoading}>
                {isPending || (imgLoading && <LoadingSpinner />)} Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTemplateModal;
