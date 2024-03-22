import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserAlt, FaCalendar } from "react-icons/fa";
import { JobDetails, Loading, DisplaySkill } from "@/components";
import { truncate } from "@/utils";
import { useFetchJob, useFetchAllSkills, useFetchTopTalent } from "@/actions";
const DisplayTalent = () => {
  const { id, title } = useParams();
  const { isFetching: isSkillsFetching, skills } = useFetchAllSkills();
  const { data: jobFetched } = useFetchJob(id);
  const { data: talents, isFetching: isTopTalentsFetching } =
    useFetchTopTalent(id);
  const [job, setJob] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    setJob(jobFetched);
  }, [jobFetched]);

  useEffect(() => {
    if (skills && job?.skills) {
      setSelectedSkills(
        skills.filter((skill) => job?.skills?.includes(skill._id))
      );
    }
  }, [skills, job?.skills]);

  return (
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
        {isSkillsFetching ? (
          <Loading />
        ) : (
          <JobDetails
            title={job?.title}
            payment={job?.payment}
            skills={selectedSkills}
            description={job?.description}
          />
        )}
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
                Top Applicants
              </h1>
              <p className="text-gray-500 text-2xl dark:text-gray-400">
                Here are the top individuals who applied for the{" "}
                <span className="font-extrabold text-gray-800">{title}</span>{" "}
                job at your company.
              </p>
            </div>
            <div className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2">
                {!isTopTalentsFetching && talents.length != 0 ? (
                  talents.map((talent, index) => {
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
                                {talent?.city + " " + talent?.country}
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: truncate(talent?.description, 75),
                              }}
                            />
                            <div className="flex flex-wrap gap-2 mt-4">
                              {talent?.skills?.map((skill, skillIndex) => {
                                return (
                                  <DisplaySkill
                                    skill={skill}
                                    key={skillIndex}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="bg-gray-100 p-4 rounded-b-lg">
                            <div className="flex justify-center gap-2">
                              {talent?.bookableCalendarLink && (
                                <Link
                                  className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                  to={talent.bookableCalendarLink}
                                  target="_blank"
                                >
                                  <FaCalendar />
                                  Book
                                </Link>
                              )}
                              {talent?.resume && (
                                <Link
                                  className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                  to={talent.resume}
                                  target="_blank"
                                >
                                  Resume
                                </Link>
                              )}
                            </div>
                            <p className="flex flex-row w-full text-gray-600 font-semibold items-center justify-center mt-4">
                              {talent?.availability
                                ? `Available for work `
                                : `Unavailable for work`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTalent;
