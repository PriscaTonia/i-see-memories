import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq_list } from "@/components/faq";
import PreFooter from "@/components/pre-footer";

const FAQPage = () => {
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
          src="/faq1.webp"
          alt=""
          width={641.5}
          height={641.5}
          className="w-full h-full"
        />
      </div>

      <PreFooter />
    </section>
  );
};

export default FAQPage;
