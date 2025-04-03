import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Ensure necessary weights
});

export const metadata: Metadata = {
  title: "Trainers Directory",
  description: "Developed by Ali Abid",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 ">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
