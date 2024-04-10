import React from "react";

const DisplaySkill = ({ skill, color }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full font-medium text-blue-900 ${
        color || "bg-blue-100"
      }`}
    >
      {skill.name}
    </span>
  );
};

export default DisplaySkill;
