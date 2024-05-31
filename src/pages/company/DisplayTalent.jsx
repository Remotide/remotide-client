import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserAlt, FaCalendar } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { JobDetails, Loading, DisplaySkill, Button } from "@/components";
import { truncate, calculatePercentageMatch } from "@/utils";
import {
  useFetchJob,
  useFetchAllSkills,
  useFetchTopTalent,
  getUser,
} from "../../actions";
import { InlineWidget, PopupButton } from "react-calendly";
const DisplayTalent = () => {
  const { id, title } = useParams();
  const { isFetching: isSkillsFetching, skills } = useFetchAllSkills();
  const { data: jobFetched } = useFetchJob(id);
  const { data: talents, isFetching: isTopTalentsFetching } =
    useFetchTopTalent(id);
  const user = getUser();

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
  // const [inlineWidgetData, setInlineWidgetData] = useState({
  //   calendlyUrl: "",
  //   prefill: {},
  //   text: "",
  // });
  // const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  // const widgetRef = useRef(null);

  // const openWidget = () => {
  //   setIsWidgetOpen(true);
  // };

  // const closeWidget = () => {
  //   setIsWidgetOpen(false);
  // };

  // const handleBlur = (event) => {
  //   if (widgetRef.current && !widgetRef.current.contains(event.relatedTarget)) {
  //     closeWidget();
  //   }
  // };
  return (
    <>
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
        <div role="tabpanel" className="tab-content bg-white rounded-box">
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
        <div role="tabpanel" className="tab-content bg-white rounded-box">
          <div className="flex mx-auto w-full items-center justify-center">
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
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                  {!isTopTalentsFetching && talents.length != 0 ? (
                    talents
                      .map((talent) => {
                        const match = calculatePercentageMatch(
                          selectedSkills,
                          talent.skills
                        );
                        return {
                          ...talent,
                          match,
                        };
                      })
                      .sort((a, b) => b.match - a.match)
                      .map((talent, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <div className="rounded-lg overflow-hidden max-w-lg bg-gray-100 shadow-sm">
                              <div className="flex flex-row justify-between mx-4">
                                <div className="flex items-center p-4">
                                  <div className="flex items-center justify-center w-10 h-10 bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
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
                                <div className="flex flex-col items-center justify-center font-bold text-gray-600">
                                  <p>Skills matched</p>
                                  <p>{talent.match.toFixed(2)}%</p>
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
                                        color={
                                          selectedSkills?.some(
                                            (selectedSkill) =>
                                              selectedSkill._id === skill._id
                                          )
                                            ? "bg-amber-300"
                                            : ""
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="bg-gray-100 p-4 rounded-b-lg">
                                <div className="flex justify-center gap-2">
                                  {talent?.bookableCalendarLink && (
                                    // <Link
                                    //   className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 gap-2"
                                    //   to={talent.bookableCalendarLink}
                                    //   target="_blank"
                                    // >
                                    //   <FaCalendar />
                                    //   Book
                                    // </Link>
                                    // <Button
                                    //   onClick={() => {
                                    //     setInlineWidgetData({
                                    //       calendlyUrl:
                                    //         talent.bookableCalendarLink,
                                    //       text: jobFetched.description,
                                    //       prefill: {
                                    //         name: user.name,
                                    //         email: user.email,
                                    //       },
                                    //     });
                                    //     openWidget();
                                    //   }}
                                    // >
                                    //   Book
                                    // </Button>
                                    <PopupButton
                                      url={talent.bookableCalendarLink}
                                      rootElement={document.getElementById(
                                        "root"
                                      )}
                                      text="Book Talent"
                                      prefill={{
                                        name: user.name,
                                        email: user.email,
                                        customAnswers: {
                                          a1: `Meeting for ${jobFetched.title} position \n\n ${jobFetched.description}`,
                                        },
                                      }}
                                    ></PopupButton>
                                  )}
                                  {talent?.resume && (
                                    <Link
                                      className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 gap-2"
                                      to={talent.resume}
                                      target="_blank"
                                    >
                                      <MdWork />
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
      {/* <InlineWidget
        url={inlineWidgetData.calendlyUrl}
        prefill={inlineWidgetData.prefill}
        // onEmbeddedReady={() => console.log("Calendly widget is ready")}
        // onDateAndTimeSelected={(e) =>
        //   console.log("Date and time selected:", e.data)
        // }
        shouldOpenInNewWindow={false}
        isOpen={true}
        styles={{ height: "600px" }}
      /> */}
    </>
  );
};

export default DisplayTalent;
