"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EmptyCartView = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { push } = useRouter();
  return (
    <section className="flex flex-col justify-center items-center gap-5 lg:gap-8">
      <Image
        src="/empty-cart.svg"
        alt="Empty cart image"
        width={320}
        height={260}
      />

      <div className="flex flex-col justify-center items-center gap-1">
        <h6 className="text-2xl font-bold">Your cart is empty</h6>
        <p className="text-base">Create a new photo product</p>
      </div>

      <Button
        onClick={() => push("/travel-photobooks")}
        className="col-span-1 lg:col-span-2 py-4 px-8 text-sm"
      >
        Start creating
      </Button>

      {!isLoggedIn && (
        <Link className="text-sm underline" href="/auth/sign-in">
          Or log in
        </Link>
      )}
    </section>
  );
};

export default EmptyCartView;
