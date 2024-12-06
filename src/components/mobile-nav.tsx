"use client";
import React, { ReactElement } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HambergerMenu, Profile, ShoppingCart, Truck } from "iconsax-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getUser } from "@/lib/session";
import { useRouter } from "next/navigation";

interface Props {
  navLinks: { title: string; path: string }[];
  mobnavLinks: { title: string; path: string; icon: ReactElement }[];
}

export const MobileNav = ({ navLinks, mobnavLinks }: Props) => {
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
    <div className="bg-white md:hidden">
      {/* top bar */}
      <section className="bg-black text-white justify-center items-center flex  place-items-center">
        <p className="flex gap-2 text-white ">
          <Truck size="20" color="#FFFFFF" variant="Bold" />
          Fast Shipping
        </p>
      </section>

      {/* bottom */}
      <section className="flex justify-between py-3 px-3">
        <Link href="/" className="text-2xl font-bold font-alegreya ">
          <Image src="/logo.png" alt="I see logo" width={130} height={70} />
        </Link>

        <div className="flex gap-3 items-center">
          <Link href="/auth/sign-in">
            <Profile size="24" color="#000000" />
          </Link>

          <Link href="/cart">
            <ShoppingCart size="24" color="#000000" />
          </Link>

          <Sheet>
            <SheetTrigger>
              <HambergerMenu size="32" color="#000000" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 w-full ">
              <NavigationMenu className="min-w-[80vw] pt-10 flex justify-start items-start">
                <NavigationMenuList className="w-full min-w-[80vw] flex flex-col">
                  <div className="flex w-full min-w-[80vw] flex-col gap-6 border-b pb-6">
                    {mobnavLinks.map((item) => {
                      return (
                        <NavigationMenuItem key={item?.title}>
                          <Link href={item?.path} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "flex justify-normal gap-2 w-full"
                              )}
                            >
                              {item?.icon}
                              {item?.title}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-6 border-b w-full pb-6">
                    {navLinks.map((item) => {
                      return (
                        <div key={item?.title}>
                          {item?.title === "Home" ? (
                            ""
                          ) : (
                            <NavigationMenuItem>
                              <Link href={item?.path} legacyBehavior passHref>
                                <NavigationMenuLink
                                  className={cn(
                                    navigationMenuTriggerStyle(),
                                    "w-full flex justify-normal items-start"
                                  )}
                                >
                                  {item?.title}
                                </NavigationMenuLink>
                              </Link>
                            </NavigationMenuItem>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    onClick={handleProfileClick}
                    className="flex gap-2 py-6 justify-normal items-start w-full"
                  >
                    <Profile size="24" color="#000000" /> Account
                  </div>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </div>
  );
};
