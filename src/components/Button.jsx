import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const linkRef = useRef(null);

  let { type, size, onClick, color, children, background, style, disabled } =
    props;
  const handleClick = () => {
    if (onClick) onClick();
    if (linkRef.current) {
      linkRef.current.click();
    }
  };
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
      className={`${size} py-3 px-4 inline-flex pointer-events-auto justify-center items-center gap-x-2 text-base sm:text-xl font-semibold rounded-lg border border-transparent text-nowrap ${background} ${color} ${style}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {React.Children.map(children, (child) => {
        if (child.type === Link) {
          return React.cloneElement(child, { ref: linkRef });
        }
        return child;
      })}
    </button>
  );
};

export default Button;
