import Remotide from "../assets/remotide.svg";
import Home from "../assets/Home.svg";
import User from "../assets/user-circle.svg";
import Calander from "../assets/calender-alt-2.svg";
import UserAlt from "../assets/user-alt-4.svg";
import DragDown from "../assets/DragDown.svg";
import Notification from "../assets/notification.svg";
import Selection from "./Selection";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
const JobTemplate = (props) => {
  return (
    <div className="font-sans flex flex-row w-full text-xl leading-normal tracking-[0px]">
      <div className="grid grid-cols-12 h-full w-full  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        <div className="flex col-span-3 lg:col-span-2 flex-col items-center self-stretch bg-gray-800 px-3.5 pb-96 pt-10 drop-shadow-lg">
          <div className="flex flex-row gap-x-4 items-center justify-center pt-5">
            <img
              className="h-12 w-12 object-contain object-center"
              src={Remotide}
            />
            <div className="flex items-center text-3xl text-left font-bold text-white">
              Remotide
            </div>
          </div>
          <div className="flex flex-col  pt-48">
            <Selection background="gray-800" color="white">
              <img
                src={Calander}
                alt="Jobs"
                className="text-white w-5 h-5 mr-2"
              />{" "}
              <Link to="/jobs">Jobs</Link>
            </Selection>
            <Selection background="gray-800" color="white">
              <img
                src={UserAlt}
                alt="Profile"
                className="text-white w-5 h-5 mr-2"
              />{" "}
              <Link to="/profile">Profile</Link>
            </Selection>
          </div>
        </div>
        <div className="flex flex-col h-15 col-span-9 lg:col-span-10 items-start justify-start">
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

export default JobTemplate;
