import React from "react";

const Textarea = (props) => {
  const { id, name, placeholder, type, required } = props;
  return (
    <textarea
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="block w-full h-52 px-3 py-2 border border-gray-300 rounded-md placeholder-slate-50 bg-slate-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
    />
  );
};

export default Textarea;
