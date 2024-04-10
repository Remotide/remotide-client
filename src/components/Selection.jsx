import React, { useRef } from "react";
import { Link } from "react-router-dom";
const Selection = ({ background, color, padding, children }) => {
  const linkRef = useRef(null);

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };
  return (
    <div
      className={`flex flex-row items-start justify-start m-2 self-stretch rounded-xl border-solid border-zinc-200 bg-${background} text-${color} pb-2.5 pt-2 md:p${padding}-20 text-right md:text-2xl text-sm font-semibold text-gray-700 backdrop-blur-[2px] opacity-100`}
      onClick={handleClick}
    >
      <div className="flex items-start  gap-x-3 rounded-xl border-solid border-zinc-200 backdrop-blur-[2px]">
        <button
          className="pointer-events-auto rounded flex justify-start items-center gap-x-2 mx-6 max-lg:text-xl "
          onClick={handleClick}
        >
          {React.Children.map(children, (child) => {
            if (child.type === Link) {
              return React.cloneElement(child, { ref: linkRef });
            }
            return child;
          })}
        </button>
      </div>
    </div>
  );
};

export default Selection;
