"use client";

import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed w-full z-10 bg-purple-300/80">
      <div className="h-[45px] flex justify-between items-center border-b px-4 font-semibold">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <p className="text-xl">Orion</p>
        </div>
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
