import React, { useState } from "react";

import CompanyTemplate from "./CompanyTemplate";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { jobs } from "../data";
const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <CompanyTemplate>
      <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Jobs you Posted
        </h1>
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search for job by Title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex flex-row h-12 mt-10 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Jobs</p>
          <Button size="14">
            <Link to="/postJob">Create</Link>
          </Button>
        </div>
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className=" text-gray-400 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Job Title
              </th>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Description
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Payment
              </th>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <th
                    scope="row"
                    className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-sm md:text-xl"
                  >
                    <Link to={`/company/displayTalent/${index}/${job.title}`}>
                      {job.title}
                    </Link>
                  </th>
                  <td className="px-4 sm:px-5 py-4 text-sm md:text-xl">
                    {job.description}
                  </td>
                  <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                    {job.payment}
                  </td>
                  <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button size="sm:w-20">Edit</Button>
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
    </CompanyTemplate>
  );
};

export default Jobs;
