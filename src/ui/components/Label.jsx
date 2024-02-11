import React from "react";

const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block my-2 sm:text-xl text-base font-bold text-gray-900"
    >
      {children}
    </label>
  );
};

export default Label;
