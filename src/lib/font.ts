import { Alegreya_Sans, Khula, Montserrat } from "next/font/google";

export const khula = Khula({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-khula",
});

export const alegreya = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-alegreya",
});

// Adding Montserrat Serif (as "Hagrid text")
export const hagridText = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hagrid-text",
});