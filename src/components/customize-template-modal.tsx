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
import { useRef, useState } from "react";
import { notify } from "@/lib/notify";
import { useStore } from "zustand";
import { photoBookStore } from "@/store";
import { SketchPicker } from "react-color";
import { useClickAway } from "react-use";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(1, { message: "Cover Title is required" }),
  subtitle: z.string().min(1, { message: "Add a subtitle" }),
});

const CustomizeTemplateModal = ({ isOpen, onClose }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  // click outside ref
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowPicker(false);
  });

  // store
  const setTitle = useStore(photoBookStore, (state) => state.setTitle);
  const setSubTitle = useStore(photoBookStore, (state) => state.setSubTitle);
  const setColor = useStore(photoBookStore, (state) => state.setColor);

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setSelectedColor(color.hex);
  };

  const getColorName = (hex) => {
    // Optionally match the color hex to a name (you can expand this list)
    const colorNames = {
      "#ffffff": "White",
      "#000000": "Black",
      "#ff0000": "Red",
      "#00ff00": "Green",
      "#0000ff": "Blue",
    };
    return colorNames[hex.toLowerCase()] || `${hex}`;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setTitle(values.title);
    setSubTitle(values.subtitle);
    setColor(selectedColor);

    notify("info", "Customizations saved");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>Customize Template</DialogTitle>
        </DialogHeader>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-6 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Name fields */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Cover Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg. Dubai, Girls Trip, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Sub Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg. 2024, 2022 Memories, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col">
              {/* Input Box Styled with Tailwind */}
              <div className="relative">
                <input
                  type="text"
                  value={selectedColor}
                  readOnly
                  onClick={() => setShowPicker(!showPicker)}
                  className="cursor-pointer border border-gray-300 p-2 rounded-md w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="text-sm mt-2 block text-gray-700">
                  Color Name: {getColorName(selectedColor)}
                </span>
              </div>

              {/* Pop-up Color Picker */}
              {showPicker && (
                <div ref={ref} className="absolute mt-2 z-10">
                  <SketchPicker
                    color={selectedColor}
                    onChangeComplete={handleChangeComplete}
                  />
                  <Button
                    onClick={() => setShowPicker(false)}
                    className="mt-2 text-white px-4 py-2 rounded-md"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col md:flex-row col-span-1 lg:col-span-2 gap-3 justify-between w-full items-center">
              <Button
                type="button"
                className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeTemplateModal;
