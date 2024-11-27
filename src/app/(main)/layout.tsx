// "use client";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "I See Memories",
  description: "I See Memories",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="p-6 lg:p-10">Page Loading...</div>}>
        {children}
      </Suspense>
      <Footer />
    </main>
  );
}
