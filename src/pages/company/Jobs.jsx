import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Loading, ConfirmationDialog } from "@/components";

import { useFetchJobs, useDeleteJob } from "@/actions";
import { truncate } from "@/utils";
const Jobs = () => {
  const { data: jobs, isFetching: isAllJobsFetching } = useFetchJobs();
  const { deleteJob, isDeleting } = useDeleteJob();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    if (jobs) {
      setFilteredJobs(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [jobs, searchTerm]);

  // const handleDelete = (job) => {
  //   const { _id } = job;
  //   if (window.confirm(`Are you sure you want to delete ${job.title}?`)) {
  //     deleteJob(_id);
  //   }
  // };

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Jobs you Posted</h1>
      <Input
        type="text"
        size="w-4/5"
        placeholder="Search for job by Title"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="flex flex-row h-20 mt-10 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Jobs</p>
        <Button size="14">
          <Link to="/company/job">Create</Link>
        </Button>
      </div>
      {isAllJobsFetching ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className=" text-gray-400 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Job Title
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm md:text-xl max-[450px]:hidden"
              >
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
                    <Link
                      to={`/company/displayTalent/${job._id}/${job.title}`}
                      className="hover:underline"
                    >
                      {job.title}
                    </Link>
                  </th>
                  <td className="px-4 sm:px-5 py-4 text-sm md:text-xl max-[450px]:hidden">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncate(job.description, 75),
                      }}
                    />
                  </td>
                  <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                    {job.payment}
                  </td>
                  <td className="flex justify-start align-middle gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button size="sm:w-fit">
                      <Link to={`/company/job/${job._id}`}>Edit Job</Link>
                    </Button>
                    {/* <Button
                      size="sm:w-20"
                      background="bg-red-500"
                      color="text-black"
                      onClick={() => handleDelete(job)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button> */}
                    <ConfirmationDialog
                      label="Delete Job"
                      description={`Are you sure you want to delete this ${job.title} job ?`}
                      title="Delete"
                      key={index}
                      onConfirm={() => {
                        !isDeleting ? deleteJob(job._id) : null;
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Jobs;
