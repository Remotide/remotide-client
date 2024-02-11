import React from "react";

const Sidebar = (props) => {
  return (
    <div className="flex col-span-3 lg:col-span-2 flex-col min-h-screen overflow-y-auto items-center self-stretch bg-gray-800 px-3.5 pb-96 pt-10 drop-shadow-lg">
      {props.children}
    </div>
  );
};

export default Sidebar;
