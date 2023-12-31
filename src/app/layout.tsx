import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionProvider from "./SessionProvider";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "my-Zone",
  description: "Don't buy from Amazon, buy from my-Zone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="p-4 max-w-7xl mx-auto min-w-[300px]">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
