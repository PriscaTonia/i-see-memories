import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className=" font-hagrid">
      <div className="flex container py-[60px] px-5 flex-col-reverse gap-3 lg:grid lg:grid-cols-2 lg:gap-x-[60px]">
        {/* text */}
        <aside className="flex flex-col gap-5 justify-center bg-white">
          <h3 className="text-black font-bold text-2xl md:text-[40px] uppercase md:leading-[48px] md:max-w-[60%]">
            FAQ
          </h3>

          <p className="text-black font-normal text-base md:text-lg">
            Find answers to commonly asked questions about &quot;I see
            memories&quot; photobooks and the creation process.
          </p>

          <Accordion type="single" collapsible>
            {faq_list?.map((item) => {
              return (
                <AccordionItem
                  className="text-base md:text-lg text-black"
                  key={item?.title}
                  value={item?.title}
                >
                  <AccordionTrigger>{item?.title}</AccordionTrigger>
                  <AccordionContent>{item?.description}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </aside>

        {/* image */}
        <Image
          src="/faq-image.webp"
          alt=""
          width={641.5}
          height={641.5}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default FAQ;

export const faq_list = [
  {
    title: "How to order?",
    description:
      "Ordering your I see memories photobook is simple and fun. Start by visiting Iseememories.com and clicking Create a Book. Select your preferred book size, such as 8x8 or 11x14, and choose between hardcover or softcover options. Next, upload your photos - we accept most formats including JPEG, PNG, and TIFF. Use our intuitive drag-and-drop editor to arrange your photos and customize layouts. Add captions, change backgrounds, and adjust photo effects as desired. Choose your cover design and add a title. Before finalizing, review your creation in our 3D preview tool. Once you're satisfied, add to cart, proceed to checkout, select your shipping method, and complete payment.",
  },
  {
    title: "How long does it take to receive my photobook?",
    description:
      "Production time for your photobook is typically 3-5 business days. Shipping times vary depending on the method you choose. Standard shipping usually takes 4-7 business days, while expedited shipping can get your book to you in 2-3 business days. For those in a hurry, our rush shipping option delivers in just 1-2 business days. Keep in mind that international shipping may take longer. You'll see estimated delivery dates at checkout to help you choose the best option for your needs.",
  },
  {
    title: "Can I customize my photobook design?",
    description:
      "Absolutely! Our platform offers extensive customization options. You can choose from over 100 pre-designed layouts or create your own from scratch. Our editor allows you to adjust photo sizes and positions freely. Customize text with various fonts, colors, and sizes. Choose from a wide range of background colors and patterns to complement your photos. Apply photo effects like black and white, sepia, or custom filters. Select from multiple cover options including image wrap, leather, and linen. You can even save your own templates for future use, making it easy to maintain a consistent style across multiple books.",
  },
  {
    title: "What is the quality of the photobooks?",
    description:
      "We pride ourselves on delivering professional-grade quality in every book. Our printing process uses 300 DPI for sharp, vivid images that truly bring your memories to life. We use archival-quality paper rated to last over 100 years, ensuring your memories are preserved for generations. The pages are thick to prevent any bleed-through of images. For an even more premium experience, try our layflat binding option, which creates seamless spreads across pages. All covers come with a protective coating for added durability. We also employ careful color calibration to ensure what you see on screen closely matches the final printed product.",
  },
  {
    title: "Do you ship internationally?",
    description:
      "Yes, we're proud to offer shipping to over 100 countries worldwide. Our standard international shipping typically takes 10-15 business days, while our express option can deliver your book in 5-7 business days. Please note that customs fees may apply depending on your country's regulations. We provide tracking for all international orders to give you peace of mind. For a comprehensive list of countries we ship to and specific rates, please visit our International Shipping page on our website. We're committed to bringing your memories home, no matter where in the world you are.",
  },
];
