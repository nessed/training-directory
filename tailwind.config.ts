import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], // Poppins as default
        mono: ["var(--font-geist-mono)", "monospace"], // Keep Geist Mono
        geist: ["var(--font-geist-sans)", "sans-serif"], // Keep Geist Sans
      },
      colors: {
        primary: "#FFFFFF",
        secondary: "#164de5",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
