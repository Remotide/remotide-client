import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Loading,
  JobDetails,
  Modal,
  ConfirmationDialog,
} from "@/components";

import { useFetchAllJobs, useFlagJob, useUnFlagJob } from "@/actions";
import { truncate } from "@/utils";
const AllJobs = () => {
  const { data: jobs, isFetching: isAllJobsFetching } = useFetchAllJobs();
  const { flagJob, isFlagging } = useFlagJob();
  const { unflagJob, isUnFlagging } = useUnFlagJob();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob({});
    setIsModalOpen(false);
  };
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
  //   const { _id: id } = job;
  //   if (window.confirm(`Are you sure you want to delete ${job.title}?`)) {
  //     flagJob(id);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          All Jobs Posted in Remotide
        </h1>
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search for job by Title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value.trim())}
        />
        <div className="flex flex-row h-12 mt-10 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Jobs</p>
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
                  className="px-5 py-3 text-sm md:text-xl max-md:hidden"
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
                      ></Link>
                      <p className=" hover:underline font-semibold ">
                        {job.title}
                      </p>
                    </th>
                    <td className="px-4 sm:px-5 py-4 text-sm md:text-xl max-md:hidden">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(job.description, 75),
                        }}
                      />
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                      {job.payment}
                    </td>
                    <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                      <Button
                        size="sm:w-30"
                        onClick={() => {
                          setSelectedJob(job);
                          openModal();
                        }}
                      >
                        Job Details
                      </Button>
                      {/* <Button
                        size="sm:w-20"
                        background="bg-red-500"
                        color="text-black"
                        onClick={() => {
                          handleDelete(job);
                        }}
                        disabled={isFlagging}
                      >
                        Delete
                      </Button> */}
                      <ConfirmationDialog
                        label={
                          !job?.violating_policies
                            ? "Flag Job For Violating Policy"
                            : " Unflag Job "
                        }
                        description={
                          !job?.violating_policies
                            ? `Are you sure you want to flag this ${job.title} job for violating policy?`
                            : `Are you sure you want to un-flag this ${job.title} job ?`
                        }
                        title={
                          !job?.violating_policies ? "Flag Job" : " Unflag Job "
                        }
                        key={index}
                        onConfirm={() => {
                          !isFlagging && !isUnFlagging
                            ? !job?.violating_policies
                              ? flagJob(job._id)
                              : unflagJob(job._id)
                            : null;
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {Object.keys(selectedJob).length == 0 ? (
          <Loading />
        ) : (
          <JobDetails {...selectedJob} />
        )}
      </Modal>
    </>
  );
};

export default AllJobs;
