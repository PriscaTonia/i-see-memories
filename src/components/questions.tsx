import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq_list } from "@/components/faq";

const Questions = () => {
  return (
    <section className="py-[56px] lg:px-[80px] my-12 px-5 font-hagrid border border-black lg:max-w-[90%] mx-auto">
      <div className="flex flex-col-reverse gap-3 lg:grid lg:grid-cols-2 lg:gap-x-[60px]">
        {/* text */}
        <aside className="flex flex-col gap-5  bg-white">
          <h3 className="text-black font-bold text-2xl md:text-[40px] uppercase md:leading-[48px] md:max-w-[60%]">
            Questions
          </h3>

          <p className="text-black font-normal text-base md:text-lg">
            Find answers to commonly asked questions about &quot;I see
            memories&quot; photobooks and the creation process.
          </p>
        </aside>

        {/* faqs */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base md:text-lg text-black font-bold">
              How Thick Will My Book Be?
            </h3>

            <div className="flex gap-3">
              <p className="p-3 flex flex-col items-center justify-center rounded border border-black">
                <span className="text-2xl font-bold text-black">52</span>
                <span>Pages</span>
              </p>
              <p className="p-3 flex flex-col items-center justify-center rounded border border-black">
                <span className="text-2xl font-bold text-black">100</span>
                <span>Pages</span>
              </p>
              <p className="p-3 flex flex-col items-center justify-center rounded border border-black">
                <span className="text-2xl font-bold text-black">152</span>
                <span>Pages</span>
              </p>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default Questions;
