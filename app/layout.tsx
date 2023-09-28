import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orion",
  description: "Next generation ERP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-color4`}>
        <Navbar />
        <div className="h-screen mx-4 pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
