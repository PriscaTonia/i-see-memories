import { ShieldTick, Star1, TruckFast } from "iconsax-react";
import React from "react";

const PreFooter = () => {
  return (
    <section className="bg-[#f6f6f6] p-6">
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
        {/* reviews */}
        <div className={cont_style}>
          <TruckFast size="20" color="#000000" variant="Outline" />

          <h6 className="text-base font-bold">Fast Shipping</h6>
          <p className="text-[#666666] text-sm text-center">
            Get your photobooks delivered quickly and efficiently. We ensure
            prompt delivery so you can enjoy your memories without delay.
          </p>
        </div>

        <div className={cont_style}>
          <ShieldTick size="20" color="#000000" variant="Outline" />
          <h6 className="text-base font-bold">100% Satisfaction Guarantee</h6>
          <p className="text-[#666666] text-center text-sm">
            We stand by the quality of our photobooks. If you’re not completely
            satisfied, we’ll make it right with our satisfaction guarantee.
          </p>
        </div>
        <div className={cont_style}>
          <Star1 size="20" color="#000000" variant="Outline" />
          <h6 className="text-base font-bold">100,000+ Happy Customers</h6>
          <p className="text-[#666666] text-sm text-center">
            Join our community of satisfied customers who have preserved their
            adventures with Pixory. Your memories are in good hands.
          </p>
        </div>
        {/* end of reviews */}
      </div>
    </section>
  );
};

export default PreFooter;

const cont_style =
  "flex flex-col justify-center items-center p-3 gap-2 col-span-1 max-w-[400px]";
