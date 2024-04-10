import React from "react";

const Loading = () => {
  return (
    <div className="relative w-full h-[80vh] flex justify-center items-center z-50">
      <div className="absolute w-20 h-20 border-8 border-blue-900 opacity-100 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
