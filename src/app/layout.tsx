// "use client";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { alegreya, hagridText, khula } from "@/lib/font";
import Footer from "@/components/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "I See Memories",
  description: "I See Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${khula.variable} ${hagridText.variable} `}
    >
      <body className="">
        <main>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Footer />
        </main>
      </body>
    </html>
  );
}
