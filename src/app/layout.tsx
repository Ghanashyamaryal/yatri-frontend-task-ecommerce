import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToastViewport from "@/components/ui/molecules/ToastViewport";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryal Store - Premium Shopping",
  description: "Discover amazing products at unbeatable prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Providers>
          <MobileNav />
          <Header />
          <div className="mx-auto">
            <Sidebar />
            <div className="xl:ml-64 p-4 min-h-[calc(100dvh-3.5rem)]">
              {children}
            </div>
          </div>
          <Footer />
          <ToastViewport />
        </Providers>
      </body>
    </html>
  );
}
