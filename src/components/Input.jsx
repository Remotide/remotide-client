import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Input = (props) => {
  const { type, id, placeholder, size, onChange, required, accept, value } =
    props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className={`relative flex ${
        type != "checkbox" ? "w-full" : ""
      } items-center justify-center`}
    >
      <input
        defaultValue={value || ""}
        checked={value || ""}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        placeholder={placeholder}
        accept={accept}
        className={`bg-gray-50 border border-gray-300 text-black sm:text-xl text-base rounded-lg  block ${size} p-2.5`}
        onChange={onChange}
        required={required}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 rounded-full border-none focus:outline-0 outline-0 "
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={15} />
          ) : (
            <AiOutlineEye size={15} />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
