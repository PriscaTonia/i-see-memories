import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PreserveSection = () => {
  return (
    <section className="font-hagrid">
      <div className="container py-8 px-5  flex flex-col gap-4 md:gap-0">
        {/* section 1 */}
        <div className="flex flex-col-reverse gap-3 lg:grid lg:grid-cols-2 lg:gap-x-[60px]">
          {/* text */}
          <aside className="flex flex-col gap-5 justify-center bg-white">
            <h3 className="text-black font-bold text-2xl md:text-[40px] uppercase md:leading-[48px] md:max-w-[60%]">
              Preserve Your Adventures in Stunning Photobooks
            </h3>
            <p className="text-[#666666] text-base md:text-xl">
              I see memories travel books capture the emotional essence of your
              journeys, transforming them into beautiful keepsakes that will
              last a lifetime. Each book is meticulously crafted to reflect the
              unique aesthetic and sentimental value of your experiences.
            </p>

            <div className="flex flex-col md:flex-row gap-2 items-center pt-8">
              <Button className="text-[#F1F0ED] bg-black hover:bg-[#F1F0ED] hover:text-black rounded-md min-h-[68px] font-bold text-lg py-5 px-[56px]">
                Start My Design
              </Button>
              <Button
                variant="outline"
                className="text-[#000000] border-black hover:bg-black hover:text-[#F1F0ED] rounded-md min-h-[68px] font-bold text-lg py-5 px-[56px]"
              >
                Read the reviews
              </Button>
            </div>
          </aside>
          {/* image */}
          <Image
            src="/book1.webp"
            alt=""
            width={511.6}
            height={511.6}
            className="w-full h-full"
          />{" "}
        </div>

        {/* section 2 */}
        <div className="flex flex-col-reverse gap-3 lg:grid lg:grid-cols-2 lg:gap-x-[60px]">
          {/* image */}
          <Image
            src="/book2.webp"
            alt=""
            width={511.6}
            height={511.6}
            className="w-full h-full"
          />

          {/* text */}
          <aside className="flex flex-col gap-5 justify-center bg-white">
            <h3 className="text-black font-bold text-2xl md:text-[32px] text-center uppercase md:leading-[48px]">
              Discover the &quot;I see memories&quot; Advantage
            </h3>

            <div className="flex flex-col p-6 gap-12 bg-[#f6f6f6] max-w-[515.2px] mx-auto">
              <div className="flex gap-4">
                <Image
                  src="/love-frame.png"
                  alt=""
                  width={55}
                  height={55}
                  className="w-[55px] h-[55px]"
                />
                <p className="flex flex-col text-black text-base">
                  <span className="font-bold">
                    Emotional Essence and Keepsakes
                  </span>
                  <span className="font-normal">
                    Transform your cherished memories into lasting, beautiful
                    photobooks.
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/open-book.png"
                  alt=""
                  width={55}
                  height={55}
                  className="w-[55px] h-[55px]"
                />
                <p className="flex flex-col text-black text-base">
                  <span className="font-bold">Meticulous Craftsmanship</span>
                  <span className="font-normal">
                    Each book is meticulously designed to reflect the unique
                    value of your experiences.
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/stars.png"
                  alt=""
                  width={55}
                  height={55}
                  className="w-[55px] h-[55px]"
                />
                <p className="flex flex-col text-black text-base">
                  <span className="font-bold">Highly Rated and Trusted</span>
                  <span className="font-normal">
                    Rated #1 in photo books with over 10,000 happy customers.
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PreserveSection;
