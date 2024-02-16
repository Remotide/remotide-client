import React, { useState } from "react";
import AdminTemplate from "./AdminTemplate";
import { talents, companies } from "../data";
import Button from "../components/Button";
import Input from "../components/Input";
const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTalents = talents.filter((talent) =>
    talent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter((company) =>
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminTemplate>
      <div className="space-y-4 mx-auto w-full">
        <div className="flex justify-center">
          <Input
            type="text"
            size="w-4/5"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
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
            <div className="gap-4 space-x-2 mt-12">
              <p className="font-semibold text-xl">
                Total Talents: {filteredTalents.length}
              </p>
              <table className="w-full text-left rtl:text-right text-gray-500">
                <thead className=" text-gray-400 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Talent name
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Email Address
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTalents.map((talent, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-50  border-b"
                      >
                        <th
                          scope="row"
                          className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                        >
                          <p>{talent.name}</p>
                        </th>
                        <td className="px-4 sm:px-5 py-4 text-base md:text-xl">
                          {talent.email}
                        </td>
                        <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                          <Button
                            size="sm:w-20"
                            background="bg-red-500"
                            color="text-black"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
            <div className="gap-4 space-x-2 mt-12">
              <p className="font-semibold text-xl">
                Total Companies: {filteredCompanies.length}
              </p>
              <table className="w-full text-left rtl:text-right text-gray-500">
                <thead className=" text-gray-400 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Company name
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Email Address
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-50  border-b"
                      >
                        <th
                          scope="row"
                          className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                        >
                          <p>{company.name}</p>
                        </th>
                        <td className="px-4 sm:px-5 py-4 text-base md:text-xl">
                          {company.email}
                        </td>
                        <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                          <Button
                            size="sm:w-20"
                            background="bg-red-500"
                            color="text-black"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default UsersList;
