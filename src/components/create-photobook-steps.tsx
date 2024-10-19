import Image from "next/image";
import React from "react";

const CreatePhotoBookSteps = () => {
  return (
    <section className="p-[28px] md:p-[60px] flex flex-col gap-[60px] bg-[#f6f6f6] font-hagrid">
      {/* part 1 */}
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-x-[60px]">
        <h3 className="text-black font-bold text-[40px] uppercase leading-[48px] max-w-[616px]">
          It’s easy as 1, 2, 3 to create your photobook
        </h3>
        <p className="flex flex-col text-black text-lg font-normal max-w-[616px]">
          With I see memories, you can easily transform your holiday photos into
          a stunning photobook that captures the essence of your journey. Simply
          upload your images, customize the layout, and add captions to create a
          unique keepsake that will transport you back to those special moments.
        </p>
      </div>
      {/* part 2 */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between">
        {/* first step */}
        <div className="flex flex-col justify-center">
          <Image
            src="/choose-template.webp"
            alt=""
            width={400}
            height={336.19}
            className=""
          />
          {/* <h5 className="text-black font-bold text-2xl uppercase max-w-[616px]">
            1. Choose Your Template
          </h5>
          <p className="flex flex-col text-black text-lg font-normal max-w-[616px]">
            You can easily customize every template in our easy to use editor
            online. No app needed!
          </p> */}
        </div>
        {/* second */}
        <div className="flex flex-col justify-center">
          <Image
            src="/upload-photos.webp"
            alt=""
            width={400}
            height={336.19}
            className=""
          />
          {/* <h5 className="text-black font-bold text-2xl uppercase max-w-[616px]">
            1. Choose Your Template
          </h5>
          <p className="flex flex-col text-black text-lg font-normal max-w-[616px]">
            You can easily customize every template in our easy to use editor
            online. No app needed!
          </p> */}
        </div>
        {/* third */}
        <div className="flex flex-col justify-center">
          <Image
            src="/customize-book.webp"
            alt=""
            width={400}
            height={336.19}
            className=""
          />
          {/* <h5 className="text-black font-bold text-2xl uppercase max-w-[616px]">
            1. Choose Your Template
          </h5>
          <p className="flex flex-col text-black text-lg font-normal max-w-[616px]">
            You can easily customize every template in our easy to use editor
            online. No app needed!
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default CreatePhotoBookSteps;
