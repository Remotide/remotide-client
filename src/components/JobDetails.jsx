import React from "react";
import DisplaySkill from "./DisplaySkill";
const JobDetails = (props) => {
  const { title, payment, skills, description } = props;
  return (
    <div className="w-full min-h-screen overflow-y-auto py-6 space-y-2">
      <div className="container px-4 flex flex-col space-y-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
            {title}
          </h1>
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
      <div className="container px-4 flex flex-col space-y-4">
        <div className="max-w-7xl space-y-4">
          <p className="text-gray-800 md:text-2xl/relaxed">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
