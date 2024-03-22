import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components";
import { getUser } from "@/actions";
import Remotide from "@/assets/remotide.svg";

const ErrorPage = () => {
  const navigate = useNavigate();
  const user = getUser();
  const handleRedirect = () => {
    user?.role
      ? user?.role != "superadmin"
        ? navigate(`/${user.role}`)
        : navigate("/admin")
      : navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img className="h-24 w-24 object-contain object-center" src={Remotide} />
      <div className="flex items-center pb-9 text-left font-bold text-zinc-400">
        Remotide
      </div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <FaExclamationTriangle className="text-red-500" size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          We're sorry, but an error occurred while trying to load the page.
          Please try again later or contact our support team for assistance.
        </p>
        <Button onClick={handleRedirect} style="w-full bg-red-500">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
