import {
  MoneyRecive,
  Profile,
  ShoppingCart,
  Star1,
  Truck,
} from "iconsax-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  navLinks: { title: string; path: string }[];
}

export const DesktopNav = ({ navLinks }: Props) => {
  return (
    <div className="font-khula hidden md:flex flex-col ">
      {/* top bar */}
      <section className="bg-black text-white grid grid-cols-4 px-10 place-items-center">
        <p className="flex gap-2 text-white col-span-1">
          <Truck size="20" color="#FFFFFF" variant="Bold" />
          Fast Shipping
        </p>
        <p className="flex gap-2 text-white col-span-2">
          <span className="flex gap-1 mt-1">
            <Star1 size="12.35" color="#FFFFFF" variant="Bold" />{" "}
            <Star1 size="12.35" color="#FFFFFF" variant="Bold" />{" "}
            <Star1 size="12.35" color="#FFFFFF" variant="Bold" />{" "}
            <Star1 size="12.35" color="#FFFFFF" variant="Bold" />{" "}
            <Star1 size="12.35" color="#FFFFFF" variant="Bold" />
          </span>
          Over 10,000+ 5 Star Reviews
        </p>
        <p className="flex gap-2 text-white col-span-1">
          <MoneyRecive size="20" color="#FFFFFF" variant="Bold" />
          30 Day Money Back Guarantee
        </p>
      </section>

      {/* bottom section */}
      <section className=" w-full text-black grid grid-cols-4 px-16 bg-white py-3 items-center">
        <NavigationMenu className="col-span- ">
          <NavigationMenuList className="flex flex-row gap-3">
            {navLinks.map((item) => {
              return (
                <NavigationMenuItem key={item?.title}>
                  <Link href={item?.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-base")}
                    >
                      {item?.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/"
          className="justify-self-center col-span-2 max-h-[70px] overflow-hidden"
        >
          <Image
            src="/logo.png"
            alt="I see logo"
            width={130}
            height={50}
            className="w-[130px]"
          />
        </Link>

        <div className="flex gap-5 col-span-1 justify-self-end ">
          <Profile size="24" color="#000000" />
          <ShoppingCart size="24" color="#000000" />
        </div>
      </section>
    </div>
  );
};
