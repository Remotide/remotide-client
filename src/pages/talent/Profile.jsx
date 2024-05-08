import React, { useState, useEffect } from "react";
import { ImageUploader, Loading, DisplaySkill, Button } from "@/components";
import { FaMap, FaUserAlt } from "react-icons/fa";
import { useFetchTalentProfile, useFetchAllSkills } from "@/actions";
import { Link } from "react-router-dom";
const ViewTalentProfile = () => {
  const { isFetching: isTalentProfileFetching, data: talentProfile } =
    useFetchTalentProfile();
  const { isFetching: isSkillsFetching, skills } = useFetchAllSkills();
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (skills && talentProfile) {
      setSelectedSkills(
        skills.filter((skill) => talentProfile?.skills.includes(skill._id))
      );
    }
  }, [skills, talentProfile]);
  return (
    <>
      <div className="flex flex-col w-full space-y-2 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Talent profile</h1>
        <div className="flex flex-grow flex-row items-center justify-between">
          <p className="text-gray-500 text-2xl dark:text-gray-400">
            Here's your basic information.
          </p>
          <Button size="h-14 ">
            <Link to="/talent/editProfile">Edit Profile</Link>
          </Button>
        </div>
      </div>
      {isTalentProfileFetching ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-x-4">
            <div className="flex flex-row items-center">
              <div className="flex-shrink-0">
                <ImageUploader
                  blobUrl={talentProfile?.profileImage || "Invalid Link"}
                  containerDims="h-[96px] w-[96px]"
                  borderType="rounded-full"
                />
              </div>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-extrabold">
                  {talentProfile?.name || "Name field is not set."}
                </h1>
                <div className="flex items-center space-x-2 text-xl font-semibold">
                  <FaMap className="w-4 h-4 flex-shrink-0" />
                  <p>
                    {talentProfile?.city || "City field is empty."},{" "}
                    {talentProfile?.country || "Country field is empty."}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex gap-5 mt-4">
                <p className="font-extrabold text-2xl">Resume :</p>
                {talentProfile?.resume ? (
                  <Link
                    className="text-2xl font-semibold underline"
                    to={talentProfile?.resume || ""}
                    target="_blank"
                  >
                    Link to resume
                  </Link>
                ) : (
                  <p>You have not submitted your resume.</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center mt-4">
                <div className="font-extrabold text-2xl">Availability :</div>
                <p className="font-semibold text-2xl">
                  Currently{" "}
                  {talentProfile?.availability ? "Available" : "Unavailable"}{" "}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center mt-4">
                <div className="font-extrabold text-2xl">Calendar Link :</div>
                <Link
                  className="text-2xl font-semibold underline"
                  to={talentProfile?.bookableCalendarLink || ""}
                  target="_blank"
                >
                  Book Talent
                </Link>
              </div>
            </div>
          </div>
          {selectedSkills.length != 0 ? (
            <div className="flex flex-wrap gap-2 items-center mt-10">
              <p className="font-extrabold text-2xl ">Skills :</p>
              {selectedSkills.map((skill, skillIndex) => {
                return <DisplaySkill skill={skill} key={skillIndex} />;
              })}
            </div>
          ) : (
            <p>You havenot selected any skills yet.</p>
          )}
          <div className="grid gap-0.5 mt-7">
            <div className="text-2xl font-bold">Description</div>
            {talentProfile?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: talentProfile?.description }}
              />
            ) : (
              <p>You have not filled the description field.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTalentProfile;
