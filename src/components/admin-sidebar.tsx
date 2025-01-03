"use client";
import clsx from "clsx";
import { useMedia } from "react-use";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { CircleX, LogOut } from "lucide-react";
import Cookies from "js-cookie";

interface Props {
  handleCloseSidebar: () => void;
  isOpen: boolean;
}

const AdminSidebar = ({ handleCloseSidebar, isOpen }: Props) => {
  const isMobileSize = useMedia("(max-width: 1023px)", false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    Cookies.remove("admin-token");
    Cookies.remove("admin-id");
    router.push("/admin/login");
  };

  return (
    <div
      className={clsx(
        isMobileSize && !isOpen
          ? "hidden"
          : isMobileSize && isOpen
          ? "fixed left-0 top-0 z-50 flex h-screen w-full flex-col gap-20 bg-white px-[21px] pt-[29px]"
          : !isMobileSize && (isOpen || !isOpen)
          ? "sticky left-0 top-0 min-h-[60vh] w-full max-w-[25%] bg-[#f2f2f2] text-black p-10"
          : ""
      )}
    >
      {/* close icon */}
      <div className="flex w-full justify-end">
        {" "}
        <span
          onClick={handleCloseSidebar}
          className={clsx(
            !isMobileSize && "hidden",
            "flex h-8 w-12 cursor-pointer items-center justify-center px-[5.55px] py-[3.70px]"
          )}
        >
          <CircleX size={20} />
        </span>
      </div>

      {/* sidebar links */}
      <ul className="flex flex-col">
        {adminSidebarLinks.map((link) => {
          return (
            <li
              key={link.id}
              className={clsx(
                pathname === link.path
                  ? "bg-app-gray font-semibold text-black"
                  : "",
                "flex w-full max-w-[80%] cursor-pointer items-center gap-[10px] rounded p-[10px] text-[#545454] hover:bg-app-gray hover:font-semibold"
              )}
              onClick={() => {
                router.push(`${link?.path}`);
                handleCloseSidebar();
              }}
            >
              <span className="font-ibm text-base">{link.title}</span>
            </li>
          );
        })}

        {/* Logout button */}
        <>
          <li
            className={clsx(
              "flex w-full max-w-[80%] absolute bottom-10 cursor-pointer items-center gap-[10px] rounded p-[10px] text-[#545454] hover:bg-app-gray hover:font-semibold"
            )}
            onClick={() => {
              logout();
              handleCloseSidebar();
            }}
          >
            <LogOut size={20} />
            <span className="font-ibm text-base">Logout</span>
          </li>
        </>
      </ul>
    </div>
  );
};

export default AdminSidebar;

export const adminSidebarLinks = [
  {
    id: 1,
    title: "All Products",
    path: "/admin/dashboard/products",
  },
  {
    id: 2,
    title: "Photo Templates",
    path: "/admin/dashboard/templates",
  },
  {
    id: 3,
    title: "View Orders",
    path: "/admin/dashboard/orders",
  },
  {
    id: 4,
    title: "Shipping Prices",
    path: "/admin/dashboard/shipping",
  },
];
