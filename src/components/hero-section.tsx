import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-hero-image min-h-[60vh]">
      <div className="container py-[40px] md:py-[120px] px-[28px] md:px-[60px] flex flex-col gap-6">
        <div className="flex w-full justify-center items-center">
          <p className="bg-white rounded-3xl items-center font-bold text-base md:text-lg py-[10px] flex gap-[10px] px-6">
            <Image
              src="/multiple-profiles.png"
              alt=""
              width={100}
              height={32}
              quality={100}
              className="w-[100px] object-contain h-6 md:h-8"
            />{" "}
            10,000+ Happy Customers
          </p>
        </div>

        <h1 className="text-[#F1F0ED] flex flex-col uppercase text-2xl md:text-[3rem] w-full text-center font-hagrid font-bold leading-[28.8px] md:leading-[57.6px] mx-auto">
          <span>Preserve Your</span>
          <span>Adventures in Beautiful</span>
          <span>Photobooks</span>
        </h1>

        <p className="font-hagrid text-base md:text-lg text-white max-w-[80%] text-center mx-auto">
          &quot;I see memories&quot; allows you to create lasting keepsakes of
          your cherished moments. Transform your experiences into unforgettable
          stories.
        </p>

        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <Button className="bg-[#F1F0ED] text-black hover:bg-black hover:text-white rounded-md min-h-[68px] font-bold text-lg py-5 px-[56px]">
            Start My Design
          </Button>
          <Button
            variant="outline"
            className="text-[#F1F0ED] rounded-md min-h-[68px] font-bold text-lg py-5 px-[56px]"
          >
            Read the reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
