import React from "react";
import AdminTemplate from "./AdminTemplate";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheck, FaUser, FaBuilding } from "react-icons/fa";
import Button from "../components/Button";
import { talents, companies } from "../data";
const VerifyPage = () => {
  return (
    <AdminTemplate>
      <div className="space-y-4 mx-auto w-full">
        <div
          role="tablist"
          className="tabs tabs-boxed items-center bg-white border-0"
        >
          <input
            type="radio"
            name="my_tabs_1"
            className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
            value="talent"
            aria-label="Talent"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-0" value="talent">
            <div className="grid gap-4 space-x-2 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {talents.map((talent, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-x-8 mx-2 p-3 rounded-lg bg-white border-gray-300 border-2 shadow-lg"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <FaUserCircle size={25} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-semibold">{talent.name}</div>
                      <div className="flex items-center space-x-4">
                        <Button>
                          <FaUser className="w-4 h-4" />
                          <Link to={talent.profileLink}>View Profile</Link>
                        </Button>
                        <Button>
                          <FaCheck className="w-4 h-4" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
            value="company"
            aria-label="Company"
          />
          <div role="tabpanel" className="tab-content p-0" value="company">
            <div className="grid gap-4 mx-2 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.map((company, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-x-8 mx-2 p-3 rounded-lg bg-white border-gray-300 border-1 shadow-lg"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <FaBuilding size={25} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-semibold">{company.name}</div>
                      <div className="flex items-center space-x-4">
                        <Button>
                          <FaUser className="w-4 h-4" />
                          <Link to={company.profileLink}>View Profile</Link>
                        </Button>
                        <Button>
                          <FaCheck className="w-4 h-4" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default VerifyPage;
