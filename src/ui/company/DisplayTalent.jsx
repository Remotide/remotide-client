import React from "react";
import { Link } from "react-router-dom";
import CompanyTemplate from "./CompanyTemplate";
import { useParams } from "react-router-dom";
import JobDetails from "../components/JobDetails";
import { talents } from "../data";
import { FaUserAlt, FaCalendar } from "react-icons/fa";
const DisplayTalent = () => {
  const { id, title } = useParams();

  return (
    <CompanyTemplate>
      <div
        role="tablist"
        className="tabs tabs-boxed items-center bg-white border-0 w-full"
      >
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[160px]"
          aria-label="Job Details"
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 rounded-box p-6"
        >
          <JobDetails
            title="Senior Frontend Engineer"
            salary="15$ per hour"
            skills={["MySQL", "PostgreSQL", "MongoDB"]}
            description="We are looking for a Senior Frontend Engineer to join our
team. You will be responsible for architecting and
implementing the user interface of our next-generation web
applications. The ideal candidate is a self-starter who is
comfortable working in a dynamic environment and has a passion
for building elegant user interfaces."
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[160px]"
          aria-label="Top 10 Applicants"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 rounded-box p-6"
        >
          <div className="flex mx-auto w-full items-center justify-center px-4">
            <div className="mt-10">
              <div className="my-6 space-y-5">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Top 10 Applicants
                </h1>
                <p className="text-gray-500 text-2xl dark:text-gray-400">
                  Here are the top 10 individuals who applied for the{" "}
                  <span className="font-extrabold text-gray-800">{title}</span>{" "}
                  job at your company.
                </p>
              </div>
              <div className="space-y-10">
                <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2">
                  {talents.map((talent, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="rounded-lg overflow-hidden max-w-lg bg-gray-100 shadow-sm">
                          <div className="flex items-center p-4">
                            <div className="flex justify-center w-10 h-10 bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
                              <FaUserAlt />
                            </div>
                            <div className="ml-4">
                              <h2 className="text-2xl font-bold">
                                <Link href={talent.profileLink}>
                                  {talent.name}
                                </Link>
                              </h2>
                              <p className="text-md text-gray-700">
                                {talent.job}
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <p>{talent.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {talent.skills.map((skill, skillIndex) => {
                                return (
                                  <span
                                    key={skillIndex}
                                    className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800"
                                  >
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="bg-gray-100 p-4 rounded-b-lg">
                            <div className="flex justify-center gap-2">
                              <Link
                                className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                href={talent.bookingLink}
                              >
                                <FaCalendar />
                                Book
                              </Link>
                              <Link
                                className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                href={talent.resumeLink}
                              >
                                Resume
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompanyTemplate>
  );
};

export default DisplayTalent;
