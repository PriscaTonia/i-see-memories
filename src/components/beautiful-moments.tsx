import { Star1 } from "iconsax-react";
import Image from "next/image";
import React from "react";

const BeautifulMoments = () => {
  return (
    <section className="px-5 py-[60px]">
      <div className="flex flex-col lg:grid lg:grid-cols-2 ">
        {/* image */}
        <Image
          src="/quality-moments.webp"
          alt=""
          width={511.6}
          height={511.6}
          className="w-full h-full"
        />

        {/* text */}
        <aside className="flex flex-col gap-5 p-[56px] justify-center bg-[#f6f6f6]">
          <p className="bg-white border border-black rounded-3xl items-center font-bold text-base md:text-lg py-[10px] w-fit flex gap-[10px] px-6">
            <Star1 size="20" color="#000000" variant="Bold" />
            High Quality Prints
          </p>
          <h3 className="text-black font-bold text-[40px] uppercase leading-[48px]">
            Beautiful quality for beautiful moments
          </h3>

          <p className="text-[#666666] text-xl">
            Preserve your cherished moments in a beautifully crafted photobook
            that captures the essence of your adventures.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default BeautifulMoments;
