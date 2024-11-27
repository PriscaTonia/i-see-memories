import { Star1 } from "iconsax-react";
import React from "react";

const Reviews = () => {
  return (
    <section id="reviews" className=" bg-[#f6f6f6] font-hagrid">
      <div className="container flex flex-col gap-[60px] py-[60px] px-[28px]">
        {/* first section */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="bg-transparent border border-black rounded-3xl items-center font-bold text-sm md:text-base py-[16px] w-fit flex gap-[10px] px-[19px]">
            <span className="flex gap-1">
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
            </span>
            Rated 4.4/5 based on +1475 reviews
          </p>
          <h3 className="text-black font-bold text-2xl md:text-[40px] uppercase md:leading-[48px] lg:max-w-[40%] text-center">
            Loved by thousands of &quot;I See&quot; Fans!
          </h3>
        </div>

        {/* second section */}
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
          {/* reviews */}
          <div className="flex flex-col justify-center items-center p-3 gap-2 bg-[#f1f0ed] col-span-1">
            <span className="flex gap-1">
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
            </span>
            <h6 className="text-base font-bold">Game changer</h6>
            <p className="text-[#666666] text-sm text-center">
              Just got my photobook from I see memories and it&apos;s an
              absolute game changer. It looks so stylish and really compliments
              my aesthetic to the fullest.
            </p>
            <h6 className="text-base font-bold">Chinaza</h6>
          </div>

          <div className="flex flex-col justify-center items-center p-3 gap-2 bg-[#f1f0ed] col-span-1">
            <span className="flex gap-1">
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
            </span>
            <h6 className="text-base font-bold">Best Photobook.</h6>
            <p className="text-[#666666] text-center text-sm">
              Just got my photobook from I see memories and it&apos;s an
              absolute game changer. It looks so stylish and really compliments
              my aesthetic to the fullest.
            </p>
            <h6 className="text-base font-bold">Judith</h6>
          </div>
          <div className="flex flex-col justify-center items-center p-3 gap-2 bg-[#f1f0ed] col-span-1">
            <span className="flex gap-1">
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
              <Star1 size="20" color="#000000" variant="Bold" />
            </span>
            <h6 className="text-base font-bold">Absolutely Stunning!</h6>
            <p className="text-[#666666] text-sm text-center">
              Just got my photobook from I see memories and it&apos;s an
              absolute game changer. It looks so stylish and really compliments
              my aesthetic to the fullest.
            </p>
            <h6 className="text-base font-bold">Blessing</h6>
          </div>
          {/* end of reviews */}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
