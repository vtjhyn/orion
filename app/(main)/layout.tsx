import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SideNav from "@/components/Sidenav";

export const metadata: Metadata = {
  title: "Orion",
  description: "Next generation ERP",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex h-full ">
      <SideNav />
      <div className="h-full w-full p-3">{children}</div>
    </div>
  );
}
