import React from "react";
import Remotide from "../../assets/remotide.svg";
import Jobs from "../../assets/Jobs.svg";
import User from "../../assets/user-circle.svg";
import UserAlt from "../../assets/user-circle-white.svg";
import Compliance from "../../assets/Legal_compliance.svg";
import Notification from "../../assets/notification.svg";
import Selection from "../components/Selection";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import DragDown from "../../assets/DragDown.svg";

const CompanyTemplate = (props) => {
  return (
    <div className="font-sans flex flex-row w-full min-h-screen overflow-y-auto text-xl leading-normal tracking-[0px]">
      <div className="grid grid-cols-12 min-h-screen overflow-y-auto w-full  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        <Sidebar>
          <img
            className="mr-6 h-24 w-24 object-contain object-center"
            src={Remotide}
          />
          <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
            Remotide
          </div>
          <Selection color="white" padding="l">
            <img src={UserAlt} alt="Profile" className="w-6 h-6 mr-2" />
            <Link to="/company/profile">Profile</Link>
          </Selection>
          <Selection color="white" padding="l">
            <img src={Jobs} alt="View Jobs" className="w-5 h-5 mr-2" />
            <Link to="/jobs">View Jobs</Link>
          </Selection>
          <Selection color="white" padding="l">
            <img
              src={Compliance}
              alt="Legal compliance"
              className="w-5 h-5 mr-2"
            />
            <Link to="/company/legalCompliance">Legal Compliance</Link>
          </Selection>
        </Sidebar>
        <div className="flex flex-col h-full col-span-9 lg:col-span-10 items-start justify-start">
          <NavBar>
            <div className="flex flex-row items-center justify-center">
              <img
                className="w-10 h-10 rounded-full ring-2 ring-gray-300"
                src={User}
                alt="User Avatar"
              />
              <img
                className="bg-white-100 w-5"
                src={DragDown}
                alt="Down Icon"
              />
            </div>
            <img
              className="w-8 h-8 rounded-full ring-2 ring-gray-300"
              src={Notification}
              alt="Notification"
            />
          </NavBar>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CompanyTemplate;
