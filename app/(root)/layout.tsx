import Navbar from "@/components/navbar";
import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/store/provider";
import getCurrentUser from "@/utils/getCurrentUser";
import { UserProps } from "@/store/slice/userSlice";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orion",
  description: "Next generation ERP",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log(currentUser)
  return (
    <html lang="en">
      <body className={`${font.className} bg-color4`}>
        <Providers>
          <Navbar
            currentUser={currentUser as UserProps}
          />
          <div className="h-screen mx-4 pt-12">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
