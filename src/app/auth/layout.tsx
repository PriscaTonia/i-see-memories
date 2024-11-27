import Footer from "@/components/footer";
import PreFooter from "@/components/pre-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "I See Memories | Auth",
  description: "I See Memories | Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      {children}
      <PreFooter />
      <Footer />
    </main>
  );
}
