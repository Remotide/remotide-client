import React from "react";

const DisplaySkill = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
      {skill.name}
    </span>
  );
};

export default DisplaySkill;
