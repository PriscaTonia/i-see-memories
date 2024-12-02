import { Facebook, Instagram } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TikTok from "./tiktok-icon";

const Footer = () => {
  return (
    <section className="py-[56px] px-[80px] flex flex-col gap-[3rem] md:gap-[8rem] bg-white container font-hagrid">
      {/* top section */}
      <div className="flex flex-col gap-6">
        <Link href="/" className="text-2xl font-bold font-alegreya -ml-10">
          <Image src="/logo.png" alt="I see logo" width={130} height={70} />
        </Link>

        <p className="flex flex-col gap-1 text-sm text-[#1d1f22]">
          <span className="font-bold">Contact: </span>{" "}
          <a href="mailto:support@iseememoriesng.com">
            support@iseememoriesng.com
          </a>
        </p>
        <div className="flex gap-2 items-center">
          <Link
            href="https://www.facebook.com/share/1DZnvM7jMT/?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size="20" color="#000000" variant="Bold" />
          </Link>
          <Link
            href="https://www.instagram.com/i.seememories/profilecard/?igsh=MWg5aGhqOHQwNGtlMQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size="20" color="#000000" variant="Outline" />
          </Link>
          <Link
            href="https://www.tiktok.com/@iseememories?_t=8rsQ5TfVxCL&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTok />
          </Link>

          {/* <Youtube size="20" color="#000000" variant="Bold" /> */}
        </div>
      </div>

      {/* bottom section */}
      <div className="flex flex-col-reverse md:flex-row gap-6 justify-between">
        <p className="text-sm text-[#1d1f22]">
          © 2024 I See Memories. All rights reserved.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <Link
            href="/terms-and-conditions"
            className="text-sm font-normal underline text-black"
          >
            Terms and condition
          </Link>
          {/* <Link href="/" className="text-sm font-normal underline text-black">
            Contact us
          </Link> */}
          <Link
            href="/privacy-policy"
            className="text-sm font-normal underline text-black"
          >
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
