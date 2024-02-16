import React from "react";

const Selection = (props) => {
  return (
    <div
      className={`flex flex-row items-start justify-start m-2 self-stretch rounded-xl border-solid border-zinc-200 bg-${props.background} text-${props.color} pb-2.5 pt-2 md:p${props.padding}-20 text-right md:text-2xl text-sm font-semibold text-gray-700 backdrop-blur-[2px]`}
    >
      <div className="flex items-start  gap-x-3 rounded-xl border-solid border-zinc-200 backdrop-blur-[2px]">
        <button className="pointer-events-auto rounded flex justify-start items-center gap-x-2">
          {props.children}
        </button>
      </div>
    </div>
  );
};

export default Selection;
