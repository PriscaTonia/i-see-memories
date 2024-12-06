"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Picture } from "@/lib/types";
import Image from "next/image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pictures: Picture[];
  orderNo: string;
  frontCoverUrl: string;
  fullCoverUrl: string;
}

const PictureListModal = ({
  isOpen,
  onClose,
  pictures,
  orderNo,
  frontCoverUrl,
  fullCoverUrl,
}: Props) => {
  const sortedPictures = pictures.sort((a, b) => a.pageNo - b.pageNo);
  const [progress, setProgress] = useState(false);

  const downloadPicturesAsZip = async (pictures) => {
    try {
      setProgress(true);
      const zip = new JSZip();
      const imagesFolder = zip.folder(`ISM_${orderNo}`);

      // Add the front cover
      if (frontCoverUrl) {
        const frontCoverResponse = await fetch(frontCoverUrl);
        if (!frontCoverResponse.ok) {
          throw new Error(
            `Failed to fetch front cover image: ${frontCoverUrl}`
          );
        }
        const frontCoverBlob = await frontCoverResponse.blob();
        const frontCoverExtension = frontCoverUrl.split(".").pop();
        imagesFolder.file(`Front_Cover.${frontCoverExtension}`, frontCoverBlob);
      }

      // Add the full cover
      if (fullCoverUrl) {
        const fullCoverResponse = await fetch(fullCoverUrl);
        if (!fullCoverResponse.ok) {
          throw new Error(`Failed to fetch back cover image: ${fullCoverUrl}`);
        }
        const fullCoverBlob = await fullCoverResponse.blob();
        const fullCoverExtension = fullCoverUrl.split(".").pop();
        imagesFolder.file(`Back_Cover.${fullCoverExtension}`, fullCoverBlob);
      }

      // Step 1: Sort pictures by pageNo
      const sortedPictures = [...pictures].sort((a, b) => a.pageNo - b.pageNo);

      // Step 2: Fetch each picture and add to the zip
      for (const picture of sortedPictures) {
        const response = await fetch(picture.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${picture.url}`);
        }

        const blob = await response.blob();
        const extension = picture.url.split(".").pop(); // Get file extension
        imagesFolder.file(`Page_${picture.pageNo}.${extension}`, blob);
      }

      // Step 3: Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Step 4: Trigger the download
      saveAs(zipBlob, `ISM_${orderNo}.zip`);

      setProgress(false);
    } catch (error) {
      console.error("Error while creating the zip:", error);
      alert("Failed to download pictures. Please try again.");
      setProgress(false);
    }
  };

  // console.log(pictures);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80%] md:max-w-[60%] max-h-[70%] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Pictures List</DialogTitle>
        </DialogHeader>

        <Button
          className="w-fit"
          onClick={() => downloadPicturesAsZip(pictures)}
        >
          Download All
          {progress && <LoadingSpinner />}
        </Button>

        {/* covers */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5">
          <div className="flex col-span-1 gap-1 flex-wrap flex-col">
            <h3>Front Cover</h3>
            <Image
              src={frontCoverUrl}
              width={150}
              height={150}
              alt={`Front Cover`}
              className="max-w-[150px] h-[150px] max-h-[150px]"
            />
          </div>

          <div className="flex col-span-1 gap-1 flex-wrap flex-col">
            <h3>Back Cover</h3>
            <Image
              src={fullCoverUrl}
              width={150}
              height={150}
              alt={`Full Cover`}
              className="max-w-[150px] h-[150px]"
            />
          </div>
        </div>

        {/* pictures list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {sortedPictures.map((picture) => (
            <div
              className="flex col-span-1 gap-1 flex-wrap flex-col"
              key={picture._id}
            >
              <h3>Page {picture.pageNo}</h3>
              <Image
                src={picture.url}
                width={150}
                height={150}
                alt={`Page ${picture.pageNo}`}
                className="max-w-[150px]  max-h-[150px]"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PictureListModal;
