"use client";
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
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/session";
// import { getUser } from "@/lib/session";

interface Props {
  navLinks: { title: string; path: string }[];
}

export const DesktopNav = ({ navLinks }: Props) => {
  const router = useRouter();

  const isUserLoggedIn = async () => {
    const isLoggedIn = await getUser();

    if (!isLoggedIn) {
      router.push("/auth/sign-in");
      return;
    } else {
      router.push(`/account/profile-settings`);
    }
  };

  const handleProfileClick = () => {
    isUserLoggedIn();
    // console.log(getUser());
  };

  return (
    <div className="font-khula hidden md:flex flex-col">
      {/* top bar */}
      <section className="bg-black text-white ">
        <div className="container grid grid-cols-4 px-10 place-items-center">
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
            Over 100+ 5 Star Reviews
          </p>
          <p className="flex gap-2 text-white col-span-1">
            <MoneyRecive size="20" color="#FFFFFF" variant="Bold" />
            Great Customer Service
          </p>
        </div>
      </section>

      {/* bottom section */}
      <section className=" w-full text-black bg-white">
        <div className="container grid grid-cols-4 px-16  py-3 items-center">
          <NavigationMenu className="col-span- ">
            <NavigationMenuList className="flex flex-row gap-3">
              {navLinks.map((item) => {
                return (
                  <NavigationMenuItem key={item?.title}>
                    <Link href={item?.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-base"
                        )}
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
            <button onClick={handleProfileClick}>
              <Profile size="24" color="#000000" />
            </button>

            <Link href="/cart">
              <ShoppingCart size="24" color="#000000" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
