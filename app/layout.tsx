import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Container from "@/components/container";

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
      <body className={font.className}>
        <Navbar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
