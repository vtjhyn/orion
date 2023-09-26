"use client";

import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <div className="flex gap-8 items-center">
        <div>
          <ClockCircleOutlined className="text-[20px] cursor-pointer" />
        </div>
        <div onClick={toggleOpen}>
          <UserOutlined className="text-[20px] cursor-pointer" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute border w-[150px] right-0 top-8 font-normal text-center">
          <NavMenuItem label="My Profile" />
          <NavMenuItem label="Logout" />
        </div>
      )}
    </div>
  );
};

export default NavMenu;
