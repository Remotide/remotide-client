import React from "react";
import Remotide from "../../assets/remotide.svg";
import Selection from "../components/Selection";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FaUserAlt, FaBriefcase, FaGavel } from "react-icons/fa";
const CompanyTemplate = (props) => {
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
          <Selection color="white" padding="l">
            <FaUserAlt /> <Link to="/company/profile">Profile</Link>
          </Selection>
          <Selection color="white" padding="l">
            <FaBriefcase /> <Link to="/jobs">View Jobs</Link>
          </Selection>
          <Selection color="white" padding="l">
            <FaGavel />
            <Link to="/company/legalCompliance">Legal Compliance</Link>
          </Selection>
        </Sidebar>
        <div className="flex flex-col h-full col-span-9 lg:col-span-10 items-start justify-start">
          <NavBar />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CompanyTemplate;
