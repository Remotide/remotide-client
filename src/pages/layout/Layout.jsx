import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { getUser } from "@/actions";
const Layout = () => {
  const navigate = useNavigate();
  const user = getUser();
  const role = user?.role;
  useEffect(() => {
    if (!user || !role) navigate("/");
  }, [user, role]);
  return (
    <div className="font-sans flex flex-row min-w-full overflow-x-auto min-h-screen overflow-y-auto text-xl leading-normal tracking-[0px]">
      <div className="min-h-screen overflow-y-auto min-w-full overflow-x-auto  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        <Sidebar role={role} />
        <div className="relative flex flex-col w-full h-full items-start justify-start">
          <NavBar />
          <div className="relative left-[25%] lg:left-[16.6666666%]  top-[4rem] w-3/4 lg:w-[83.33333%] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
