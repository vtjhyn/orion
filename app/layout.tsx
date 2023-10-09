import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/store/provider";
import SideNav from "@/components/Sidenav";

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
      <body className={`${font.className} bg-coor4`}>
      <Providers>
        <div className="flex flex-col w-screen h-screen">
          <Navbar />
          {children}
        </div>
      </Providers>
      </body>
    </html>
  );
}
