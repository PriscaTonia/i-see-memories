// "use client";
import type { Metadata } from "next";
import "./globals.css";
import { alegreya, hagridText, khula } from "@/lib/font";

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
      <body className="">{children}</body>
    </html>
  );
}
