"use client";
import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react"; // Import Trash icon

interface Props {
  max_num_page: number;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

interface DragItem {
  index: number;
  type: string;
}

const ItemTypes = {
  IMAGE: "image",
};

// DraggableImage component now receives a deleteImage prop
const DraggableImage = ({ image, index, moveImage, deleteImage }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index; // Update the dragged item's index after the swap
      }
    },
  });

  drag(drop(ref)); // Attach both drag and drop refs to the same DOM node

  return (
    <div
      ref={ref}
      className="w-[150px] hover:border p-[2px] h-fit flex flex-col items-center justify-center cursor-grab relative group" // Add 'relative' and 'group' for hover styling
    >
      <Image
        width={150}
        height={150}
        src={image}
        alt={`Uploaded Image ${index + 1}`}
        className="object-contain w-[150px] h-[150px]"
      />
      <p>Page {index + 1}</p>

      {/* Delete icon - visible on hover */}
      <button
        onClick={() => deleteImage(index)}
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" // Styles for hover visibility
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

const ImageUploader = ({ max_num_page, images, setImages }: Props) => {
  // Dropzone configuration
  const onDrop = (acceptedFiles: File[]) => {
    if (images.length >= max_num_page) {
      alert(`You can upload a maximum of ${max_num_page} images.`);
      return;
    }

    const imageFiles = acceptedFiles.map((file) => URL.createObjectURL(file));

    // Add only up to the max limit
    setImages((prevImages) => [
      ...prevImages,
      ...imageFiles.slice(0, max_num_page - prevImages.length),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  // Delete image by index with confirmation
  const deleteImage = (index: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmed) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Dropzone area */}
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-col justify-center items-center gap-6 border-2 border-dashed border-gray-400 p-4"
      >
        <input {...getInputProps()} />

        <h3 className="text-[30px] text-[#3b3b3b] font-khula leading-[30px] font-bold text-center">
          Smart Photo Book
        </h3>

        <p className="max-w-[60%] lg:max-w-[30%] text-xs font-khula text-center">
          Upload your photos, and we will instantly craft your photo book. It
          picks the best shots and organizes everything chronologically -
          without you lifting a finger. Maximum upload is {max_num_page} pages.
        </p>

        <Button
          disabled={images.length >= max_num_page}
          className={`text-[#F1F0ED] max-w-[60%] lg:max-w-[40%] bg-black hover:bg-[#F1F0ED] hover:text-black rounded-md min-h-[68px] font-bold py-5 px-[56px]`}
        >
          <Plus size={44} strokeWidth={3} />
          <span className="text-lg">
            {images.length >= max_num_page
              ? "Max Upload Reached"
              : "Add Photos"}
          </span>
        </Button>
      </div>

      {/* Drag and Drop Area */}
      <div className="w-full flex flex-wrap gap-3 p-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <DraggableImage
              key={`${image}-${index}`}
              image={image}
              index={index}
              moveImage={moveImage}
              deleteImage={deleteImage} // Pass delete function as prop
            />
          ))
        ) : (
          <div className="text-center w-full h-[200px] flex justify-center items-center">
            <h6 className="text-lg text-black font-semibold">
              No images uploaded yet!
            </h6>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ImageUploader;
