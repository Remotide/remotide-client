import React from "react";
import Remotide from "../assets/remotide.svg";
const Signup = () => {
  return (
    <div className="font-montserrat flex h-screen w-full flex-col items-center gap-y-5 bg-gray-50 p-36 ">
      <img className="h-28 w-32 object-contain object-center" src={Remotide} />
      <div className="flex items-center justify-center text-center text-2xl font-bold leading-normal text-zinc-400">
        Remotide
      </div>
      <div className="flex w-72 items-end justify-center pt-16 text-base font-bold leading-normal">
        <div className="flex flex-grow items-center justify-between gap-x-6 rounded-xl border-2 border-solid border-zinc-100 bg-white py-2 pl-4 pr-8 backdrop-blur-[2px]">
          <div className="flex flex-grow items-center self-stretch rounded-md bg-indigo-600 py-1 pl-1.5 pr-1 text-left text-white">
            Login
          </div>
          <div className="flex w-24 items-center justify-end pb-1 text-right text-gray-700">
            Sign up
          </div>
        </div>
      </div>
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Log in to your account
      </h1>
      <div className="w-4/5 md:w-2/5 bg-white rounded-lg shadow dark:border ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-1 md:space-y-3" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required=""
              />
            </div>
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white "
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
