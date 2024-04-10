import React, { useState } from "react";
import { FaBell, FaUserCircle, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./index";
import { useUserActions } from "@/actions/user.action";
const NavBar = ({ user }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useUserActions();
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Perform logout logic here
    // console.log('User logged out');
    logout();
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };
  return (
    <div className="fixed z-40 flex h-16 gap-x-5 px-7 items-center w-full flex-row-reverse bg-white">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <FaUserCircle size={20} />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content gap-2 mt-3 p-2 shadow bg-white rounded-box w-52"
        >
          <li>
            <Button size="w-full" style="hover:bg-gray-200 hover:text-gray-800">
              <Link className="flex flex-row gap-1" to="/updateUser">
                <FaUserAlt /> Update User
              </Link>
            </Button>
          </li>
          <li>
            <Button
              size="w-full"
              style="hover:bg-gray-200 hover:text-gray-800"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Log out
            </Button>
          </li>
        </ul>
        {showLogoutDialog && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={cancelLogout}
          >
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white z-[1000] rounded-lg p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4">Log Out Confirmation</h2>
              <p className="mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={confirmLogout}
                >
                  Log Out
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        /* <FaBell size={20} />
         */
        user && (
          <p className="font-medium text-gray-700">Welcome, {user.name}</p>
        )
      }
    </div>
  );
};

export default NavBar;
