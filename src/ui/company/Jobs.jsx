import React from "react";

import CompanyTemplate from "./CompanyTemplate";
import { Link } from "react-router-dom";
import Button from "../components/Button";
const Jobs = () => {
  const jobs = [
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
  ];
  return (
    <CompanyTemplate>
      <div className="flex flex-col w-11/12 items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-16">
        <div className="flex flex-row h-12 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Jobs</p>
          <Button size="14">
            <Link to="/postJobs">Create</Link>
          </Button>
        </div>
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className=" text-gray-400 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-sm md:text-xl">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3 text-sm md:text-xl">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-sm md:text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-sm md:text-xl"
                  >
                    <Link
                      to={`/company/displayApplicants/${index}/${job.Title}`}
                    >
                      {job.Title}
                    </Link>
                  </th>
                  <td className="px-6 py-4 text-sm md:text-xl">
                    {job.Created}
                  </td>
                  <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button size="[5px md:20px]">Edit</Button>
                    <Button
                      size="[10px md:20px]"
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
    </CompanyTemplate>
  );
};

export default Jobs;
