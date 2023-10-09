"use client";

import { LeftOutlined } from "@ant-design/icons";
import NavMenu from "./NavMenu";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const isInMain = /[^/]/g.test(path);
  const isPosPage = path.split('/')[1] === 'pos'

  console.log(isPosPage, "<< CEK ROUTER");
  return (
    <div className="mb-11">
      <nav className="fixed w-full z-10 bg-color1 text-white">
        <div className="h-12 flex justify-between items-center border-b px-4 font-semibold">
          <div className="flex gap-2">
            {isInMain && !isPosPage ? (
              <div
                className="w-8 h-8 bg-whte flex items-center rounded-lg cursor-pointer justify-center hover:bg-slate-400 "
                onClick={() => router.push("/")}
              >
                <LeftOutlined className="text-white" />
              </div>
            ) : null}
            <div>
              <p className="text-xl">Orion</p>
            </div>
          </div>
          <NavMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
