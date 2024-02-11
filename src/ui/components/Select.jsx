import React from "react";

const Select = (props) => {
  const { options } = props;
  return (
    <select className="mb-2 p-2.5 w-full bg-slate-50 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700">
      {options.map((option, index) => {
        if (index == 0) {
          return (
            <option key={index} value={option} selected>
              {option}
            </option>
          );
        } else {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        }
      })}
    </select>
  );
};

export default Select;
