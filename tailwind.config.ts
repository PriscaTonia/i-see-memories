import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "hero-image": "url('/hero-bg.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        khula: ["var(--font-khula)", "sans-serif"],
        alegreya: ["var(--font-alegreya)", "sans-serif"],
        hagrid: ["var(--font-hagrid-text)", "serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
