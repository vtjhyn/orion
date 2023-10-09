import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/store/provider";

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
        <Providers>
          <div className="h-screen mx-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
