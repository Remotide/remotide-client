import React from "react";
import Remotide from "../../assets/remotide.svg";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Selection from "../components/Selection";
import {
  FaGraduationCap,
  FaUser,
  FaUserCheck,
  FaBook,
  FaDollarSign,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
const AdminTemplate = (props) => {
  return (
    <div className="font-sans flex flex-row min-w-full overflow-x-auto min-h-screen overflow-y-auto text-xl leading-normal tracking-[0px]">
      <div className="grid grid-cols-12 min-h-screen overflow-y-auto min-w-full overflow-x-auto  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        <Sidebar>
          <img
            className="mr-6 h-24 w-24 object-contain object-center"
            src={Remotide}
          />
          <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
            Remotide
          </div>
          <div className="flex flex-col pt-28">
            <Selection color="white" padding="l">
              <FaUserCheck />
              <Link to="/admin/verification">Verification</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaUser />
              <Link to="/admin/users">Users</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaChartBar />
              <Link to="/admin/stats">Stats</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaCog />
              <Link to="/admin/manageAdmins">Admins</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaBook />
              <Link to="/admin/guides">Guides</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaGraduationCap />
              <Link to="/admin/skills">Skills</Link>
            </Selection>
            <Selection color="white" padding="l">
              <FaDollarSign />
              <Link to="/admin/packages">Packages</Link>
            </Selection>
          </div>
        </Sidebar>
        <div className="flex flex-col  h-15 col-span-9 lg:col-span-10 items-start justify-start">
          <NavBar />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
