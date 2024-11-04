"use client";
import clsx from "clsx";

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname } from "next/navigation";
import { HambergerMenu } from "iconsax-react";
import Sidebar, { sidebarLinks } from "@/components/sidebar";

export default function AccountLayout({
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
  const currentPath = sidebarLinks.filter((c) => c.path === pathname)[0];

  return (
    <>
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
      <section className="relative flex max-h-screen w-full gap-[5%] px-5 pb-8 pt-6 md:px-20 lg:max-h-[80vh]">
        <Sidebar
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
