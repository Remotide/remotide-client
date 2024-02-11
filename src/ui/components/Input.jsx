import React from "react";

const Input = (props) => {
  const { type, name, id, placeholder, size, onChange, required, accept } =
    props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      accept={accept}
      className={`bg-gray-50 border border-gray-300 text-black sm:text-xl text-base rounded-lg  block ${size} p-2.5`}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
