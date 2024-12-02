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
      "Ordering your I see memories photobook is simple and fun. Start by visiting seememoriesng.com and clicking Create a Book. Select your preferred book size, such as 21cm width x 29.7cm height, it's a hardcover photo book . Next, upload your photos - we accept most formats including JPEG, PNG. Use our intuitive drag-and-drop editor to arrange your photos and customize layouts. Add captions, and adjust photo effects as desired. Choose your cover design and add a title. Before finalizing, review your creation in our 3D preview tool. Once you're satisfied, add to cart, proceed to checkout, select your shipping method, and complete payment.",
  },
  {
    title: "How long does it take to receive my photobook?",
    description:
      "Production time for your photobook is typically 7-10 business days. Shipping times vary depending on the method you choose. Standard shipping usually takes 7-10 business days. For those in a hurry, or rush send us a mail so that we can expedite your order. Keep in mind that international shipping may take longer, send us a mail for more enquiries on shipping. You'll see estimated delivery dates at checkout to help you choose the best option for your needs.",
  },
  {
    title: "Can I customize my photobook design?",
    description:
      "Absolutely! Our platform offers extensive customization options. You can choose from our pre-designed layouts or create your own from scratch. Our editor allows you to adjust photo freely. Choose background colors and patterns to complement your photos.",
  },
  {
    title: "What is the quality of the photobooks?",
    description:
      "We pride ourselves on delivering professional-grade quality in every book. Our printing process uses 300 DPI for sharp, vivid images that truly bring your memories to life. We use archival-quality paper rated to last over 100 years, ensuring your memories are preserved for generations. The pages are thick to prevent any bleed-through of images. For an even more premium experience, All covers come with a protective coating for added durability and it's water resistant. We also employ careful color calibration to ensure what you see on screen closely matches the final printed product.",
  },
  {
    title: "Do you ship internationally?",
    description:
      "Yes, we're proud to offer shipping to so many countries worldwide. Our standard international shipping typically takes 10-15 business days, while our express option can deliver your book in 5-7 business days. Please note that customs fees may apply depending on your country's regulations. We provide tracking for all international orders to give you peace of mind. For a comprehensive list of countries we ship to and specific rates, please send us a mail with your location. We're committed to bringing your memories home, no matter where in the world you are.",
  },
];
