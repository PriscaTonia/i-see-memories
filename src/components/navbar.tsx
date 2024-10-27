import React from "react";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { BagHappy, Home } from "iconsax-react";

const Navbar = () => {
  const navLinks = [
    {
      title: "Home",
      path: "/",
      icon: <Home size="32" color="#000000" />,
    },
    {
      title: "Shop All",
      path: "/travel-photobooks",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "FAQ",
      path: "/faq",
    },
  ];

  const mobnavLinks = [
    {
      title: "Home",
      path: "/",
      icon: <Home size="24" color="#000000" />,
    },
    {
      title: "Cart",
      path: "/",
      icon: <BagHappy size="24" color="#000000" />,
    },
  ];
  return (
    <nav className="sticky top-0 w-full z-50">
      {/* desktop */}
      <DesktopNav navLinks={navLinks} />

      {/* mobile */}
      <MobileNav navLinks={navLinks} mobnavLinks={mobnavLinks} />
    </nav>
  );
};

export default Navbar;
