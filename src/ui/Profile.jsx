import React from "react";
import Remotide from "../assets/remotide.svg";
import Home from "../assets/Home.svg";
import User from "../assets/user-circle.svg";
import Selection from "./Selection";
import NavBar from "./NavBar";
import DragDown from "../assets/DragDown.svg";

const Profile = () => {
  return (
    <div className="font-montserrat flex flex-row w-full text-xl leading-normal tracking-[0px]">
      <div className="grid grid-cols-12 h-full w-full  items-start justify-between overflow-clip bg-gray-50 pb-0.5">
        <div className="flex col-span-3 lg:col-span-2 flex-col items-center self-stretch bg-white px-3.5 pb-96 pt-10 drop-shadow-lg">
          <img
            className="mr-6 h-24 w-24 object-contain object-center"
            src={Remotide}
          />
          <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
            Remotide
          </div>
          <Selection>
            <img src={Home} alt="Home" className="w-5 h-5 mr-2" /> Home
          </Selection>
          <Selection>
            <img src={Home} alt="Home" className="w-5 h-5 mr-2" /> Home
          </Selection>
          <Selection>
            <img src={Home} alt="Home" className="w-5 h-5 mr-2" /> Home
          </Selection>
          <Selection>
            <img src={Home} alt="Home" className="w-5 h-5 mr-2" /> Home
          </Selection>
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
          </NavBar>
        </div>
      </div>
    </div>
  );
};

export default Profile;
