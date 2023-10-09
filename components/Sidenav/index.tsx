'use client'

import { usePathname } from "next/navigation";

const SideNav = (props) => {
  const path = usePathname();
  const isPosPage = path.split('/')[1] === 'pos'
  
  return isPosPage ? null : (
    <div className="h-full  flex flex-col items-center pt-4 pb-3 px-3 w-20  gap-4 z-10 bg-color1">
      {[...Array(10).keys()].map((item) => (
        <div key={item} className="bg-white text-black flex items-center justify-center rounded-md w-12 h-12">
          {item}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
