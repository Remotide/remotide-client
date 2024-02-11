import React from "react";

const JobDetails = (props) => {
  return (
    <div className="w-full min-h-screen overflow-y-auto py-6 space-y-2">
      <div className="container px-4 flex flex-col space-y-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
            {props.title}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-gray-500">{props.salary}</span>
          </div>
        </div>
      </div>
      <div className="container px-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex flex-wrap gap-2">
            {props.skills.map((skill, index) => {
              return (
                <div
                  className="rounded-lg bg-gray-100 px-3 py-1 text-xl"
                  key={index}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container px-4 flex flex-col space-y-4">
        <div className="max-w-7xl space-y-4">
          <p className="text-gray-500 md:text-2xl/relaxed">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
