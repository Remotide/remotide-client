import React from "react";
import Remotide from "../assets/remotide.svg";
import Home from "../assets/Home.svg";
import User from "../assets/user-circle.svg";
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
          <div className="flex items-center justify-between gap-x-3 self-stretch rounded-xl border-solid border-zinc-200 bg-white pb-2.5 pl-8 pr-32 pt-2 text-right font-semibold text-gray-700 backdrop-blur-[2px]">
            <div className="flex flex-grow items-center justify-between gap-x-3 rounded-xl border-solid border-zinc-200 bg-gray-50 pb-2.5 pl-8 pr-32 pt-2 backdrop-blur-[2px]">
              <button className="rounded inline-flex items-center">
                {" "}
                <img src={Home} alt="Home" class="w-5 h-5 mr-2" /> Home
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-3 self-stretch rounded-xl border-solid border-zinc-200 bg-white pb-2.5 pl-8 pr-32 pt-2 text-right font-semibold text-gray-700 backdrop-blur-[2px]">
            <div className="flex flex-grow items-center justify-between gap-x-3 rounded-xl border-solid border-zinc-200 bg-gray-50 pb-2.5 pl-8 pr-32 pt-2 backdrop-blur-[2px]">
              <button className="rounded inline-flex items-center">
                {" "}
                <img src={Home} alt="Home" class="w-5 h-5 mr-2" /> Home
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-3 self-stretch rounded-xl border-solid border-zinc-200 bg-white pb-2.5 pl-8 pr-32 pt-2 text-right font-semibold text-gray-700 backdrop-blur-[2px]">
            <div className="flex flex-grow items-center justify-between gap-x-3 rounded-xl border-solid border-zinc-200 bg-gray-50 pb-2.5 pl-8 pr-32 pt-2 backdrop-blur-[2px]">
              <button className="rounded inline-flex items-center">
                {" "}
                <img src={Home} alt="Home" class="w-5 h-5 mr-2" /> Home
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-3 self-stretch rounded-xl border-solid border-zinc-200 bg-white pb-2.5 pl-8 pr-32 pt-2 text-right font-semibold text-gray-700 backdrop-blur-[2px]">
            <div className="flex flex-grow items-center justify-between gap-x-3 rounded-xl border-solid border-zinc-200 bg-gray-50 pb-2.5 pl-8 pr-32 pt-2 backdrop-blur-[2px]">
              <button className="rounded inline-flex items-center">
                {" "}
                <img src={Home} alt="Home" class="w-5 h-5 mr-2" /> Home
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse h-15 col-span-9 lg:col-span-10 items-start justify-start bg-white p-7">
          <div className="flex flex-row justify-center">
            <img
              className="w-10 h-10 rounded-full ring-2 ring-gray-300"
              src={User}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
