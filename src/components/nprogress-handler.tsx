"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "../styles/nprogress.css";

export default function NProgressHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  // Configure NProgress with spinner visibility and custom options
  useEffect(() => {
    NProgress.configure({ showSpinner: true, speed: 500, minimum: 0.2 });
  }, []);

  useEffect(() => {
    const handleStart = () => {
      // console.log("Starting NProgress...");
      setTimeout(() => NProgress.start(), 200); // Start NProgress with a delay
    };
    const handleStop = () => {
      // console.log("Stopping NProgress...");
      NProgress.done();
    };

    if (prevPath && pathname !== prevPath) {
      handleStart();
      const timeout = setTimeout(() => {
        handleStop();
      }, 500); // Adjust as needed

      return () => clearTimeout(timeout);
    }

    setPrevPath(`${pathname}?${searchParams}`);
  }, [pathname, searchParams, prevPath]);

  return null;
}
