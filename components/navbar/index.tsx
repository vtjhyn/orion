"use client";

import { UserProps } from "@/store/slice/userSlice";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";


const Navbar = ({ currentUser } : {currentUser : UserProps}) => {
  const router = useRouter();
  return (
    <nav className="fixed w-full z-10 bg-color1 text-white">
      <div className="h-[45px] flex justify-between items-center border-b px-4 font-semibold">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <p className="text-xl">Orion</p>
        </div>
        <NavMenu
          currentUser={currentUser}
        />
      </div>
    </nav>
  );
};

export default Navbar;
