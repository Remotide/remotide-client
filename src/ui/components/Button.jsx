import React from "react";

const Button = (props) => {
  let { type, size, onClick, color, children, background, style } = props;
  if (!background) {
    background = "bg-blue-700";
  }
  if (!color) {
    color = "text-white";
  }
  if (!style) {
    style = "";
  }
  return (
    <button
      className={`${size} py-3 px-4 inline-flex pointer-events-auto justify-center items-center gap-x-2 text-base sm:text-xl font-semibold rounded-lg border border-transparent ${background} ${color} ${style}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
