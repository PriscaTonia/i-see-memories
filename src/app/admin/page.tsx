"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();

  const token = Cookies.get("admin-token");

  useEffect(() => {
    if (token) {
      router.replace("/admin/dashboard");
      return;
    }
    router.replace("/admin/login"); // Redirect to /admin/login
  }, [router, token]);

  return null; // Render nothing during redirection
}
