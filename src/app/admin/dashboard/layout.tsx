"use client";
import clsx from "clsx";

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname } from "next/navigation";
import { HambergerMenu } from "iconsax-react";

import AdminSidebar, { adminSidebarLinks } from "@/components/admin-sidebar";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobileSize = useMedia("(max-width: 1023px)", false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const pathname = usePathname();
  const currentPath = adminSidebarLinks.filter((c) => c.path === pathname)[0];

  return (
    <>
      <div className="w-full flex items-center justify-center py-3 px-4">
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
      </div>
      <button
        className={clsx(
          !isMobileSize && "hidden",
          "mx-5 flex items-center gap-3 border-none font-ibm text-base font-bold outline-none md:mx-20"
        )}
        onClick={() => setIsSidebarOpen(true)}
      >
        <HambergerMenu size="32" color="#000000" />

        {currentPath?.title ? currentPath?.title : ""}
      </button>
      <section className="relative container flex min-h-[80vh] max-h-screen w-full gap-[5%] px-5 pb-8 pt-6 md:px-20 lg:max-h-[80vh]">
        <AdminSidebar
          handleCloseSidebar={handleCloseSidebar}
          isOpen={isSidebarOpen}
        />
        <div
          className={clsx(
            !isMobileSize && "max-w-[70%]",
            "scrollbar-thin py-3 scrollbar-thumb-gray-500 scrollbar-track-transparent w-full max-w-full overflow-y-auto"
          )}
        >
          {children}
        </div>
      </section>
    </>
  );
}
