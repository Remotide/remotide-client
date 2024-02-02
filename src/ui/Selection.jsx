import React from "react";

const Selection = (props) => {
  return (
    <div
      className={`flex flex-row items-start justify-center gap-x-3 m-2 self-stretch rounded-xl border-solid border-zinc-200 bg-${props.background} text-${props.color} pb-2.5 pt-2 sm:pr-24 pr-12 text-right font-semibold text-gray-700 backdrop-blur-[2px]`}
    >
      <div className="flex items-center justify-between gap-x-3 rounded-xl border-solid border-zinc-200 backdrop-blur-[2px]">
        <button className="rounded flex justify-start">{props.children}</button>
      </div>
    </div>
  );
};

export default Selection;
