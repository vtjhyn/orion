"use client";

import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";
import { UserProps } from "@/store/slice/userSlice";
import { signOut } from "next-auth/react";

const NavMenu = ({ currentUser } : {currentUser : UserProps}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <div className="flex gap-8 items-center">
        <ClockCircleOutlined className="text-[16px] cursor-pointer" />
        <UserOutlined
          className="text-[16px] cursor-pointer"
          onClick={toggleOpen}
        />
      </div>
      {isOpen && (
        <div className="absolute border w-[150px] right-0 top-8 font-normal text-center text-black">
          {currentUser && (
            <>
              <NavMenuItem label={currentUser.role.name} />
              <NavMenuItem label="My Profile" />
              <NavMenuItem label="Logout" 
                onClick={() => signOut()}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavMenu;
