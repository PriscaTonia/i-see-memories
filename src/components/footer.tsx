import { Facebook, Instagram, Youtube } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="py-[56px] px-[80px] flex flex-col gap-[3rem] md:gap-[8rem] bg-white container font-hagrid">
      {/* top section */}
      <div className="flex flex-col gap-6">
        <Link href="/" className="text-2xl font-bold font-alegreya -ml-10">
          <Image src="/logo.png" alt="I see logo" width={130} height={70} />
        </Link>

        <p className="flex flex-col gap-1 text-sm text-[#1d1f22]">
          <span className="font-bold">Contact: </span> support@iseememories.com
        </p>
        <div className="flex gap-2 items-center">
          <Facebook size="20" color="#000000" variant="Bold" />
          <Instagram size="20" color="#000000" variant="Outline" />
          <Youtube size="20" color="#000000" variant="Bold" />
        </div>
      </div>

      {/* bottom section */}
      <div className="flex flex-col-reverse md:flex-row gap-6 justify-between">
        <p className="text-sm text-[#1d1f22]">
          © 2024 I See Memories. All rights reserved.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <Link href="/" className="text-sm font-normal underline text-black">
            Terms and condition
          </Link>
          <Link href="/" className="text-sm font-normal underline text-black">
            Contact us
          </Link>
          <Link href="/" className="text-sm font-normal underline text-black">
            Privacy policy
          </Link>
          <Link
            href="/about"
            className="text-sm font-normal underline text-black"
          >
            About us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
