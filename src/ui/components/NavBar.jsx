import React from "react";
import { FaChevronDown, FaBell, FaUserCircle } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="flex h-16 gap-x-5 px-7 items-center w-full flex-row-reverse bg-white">
      <div className="flex flex-row items-center justify-center">
        <FaUserCircle size={20} />
        <FaChevronDown size={10} />
      </div>
      <FaBell size={20} />
    </div>
  );
};

export default NavBar;
