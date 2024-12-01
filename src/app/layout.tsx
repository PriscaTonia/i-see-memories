import type { Metadata } from "next";
import "./globals.css";
import "../styles/nprogress.css";

import { alegreya, hagridText, khula } from "@/lib/font";
import ProvidersParent from "@/components/providers-parent";
import NProgressHandler from "@/components/nprogress-handler";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
        <Suspense
          fallback={
            <div className="p-6 lg:p-10">
              <LoadingSpinner />
            </div>
          }
        >
          <NProgressHandler />
          <ProvidersParent>{children}</ProvidersParent>
        </Suspense>
      </body>
    </html>
  );
}
