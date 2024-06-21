import React from "react";
import DisplaySkill from "./DisplaySkill";
const JobDetails = (props) => {
  const { title, payment, skills, description, violatesPolicy } = props;
  return (
    <div className="w-full max-h-[60vh] overflow-y-scroll py-6 space-y-2">
      <div className="container px-4 flex flex-col space-y-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
            {title}
          </h1>
          {violatesPolicy && (
            <div className="text-red-500 font-extrabold text-3xl">
              This job violates our policy
            </div>
          )}
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-gray-500">
              <p className="text-2xl text-black inline-block">Payment: </p>{" "}
              {payment}
            </span>
          </div>
        </div>
      </div>
      <div className="container px-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex flex-wrap gap-2">
            <p className="text-2xl text-black">Required Skills: </p>
            {skills.map((skill, index) => {
              return <DisplaySkill skill={skill} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div
        className="max-h-max max-w-7xl text-gray-800 md:text-2xl/relaxed px-4 space-y-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default JobDetails;
