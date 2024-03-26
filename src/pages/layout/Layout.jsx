import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { getUser } from "@/actions";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();
  const user = getUser();
  const role = user?.role;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (!user || !role) navigate("/");
  }, [user, role]);

  return (
    <div className="font-sans flex flex-row min-w-screen overflow-x-auto min-h-screen overflow-y-auto text-xl leading-normal tracking-[0px]">
      <button
        className="fixed top-4 left-4 z-[1000] block lg:hidden border-none focus:outline-0 outline-0 hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <span className="sr-only text-black">Toggle Sidebar</span>
        {showSidebar ? (
          <FaTimes className="text-white h-10 w-10" />
        ) : (
          <AiOutlineMenu className="h-10 w-10" />
        )}
      </button>

      <div className="min-h-screen overflow-y-auto min-w-full overflow-x-auto  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 z-50 transition-all duration-300 bg-gray-800 ${
            showSidebar ? "left-0" : "max-lg:hidden"
          } `}
        >
          <Sidebar role={role} />
        </div>
        <div className="relative flex flex-col w-full h-full items-start justify-start">
          <NavBar user={user} />
          <div className="relative left-0 lg:left-[20%]  top-[4rem] w-full lg:w-[80%] overflow-auto md:px-16 px-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
