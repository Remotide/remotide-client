import React from "react";

const NavBar = (props) => {
  return (
    <div className="flex h-16 gap-x-5 px-7 items-center w-full flex-row-reverse bg-white">
      {props.children}
    </div>
  );
};

export default NavBar;
