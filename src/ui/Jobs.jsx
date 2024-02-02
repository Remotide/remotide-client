import Remotide from "../assets/remotide.svg";
import Home from "../assets/Home.svg";
import User from "../assets/user-circle.svg";
import Calander from "../assets/calender-alt-2.svg";
import UserAlt from "../assets/user-alt-4.svg";
import Selection from "./Selection";
import JobTemplate from "./JobTemplate";
import { Link } from "react-router-dom";
const Jobs = () => {
  const jobs = [
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
    {
      Title: "Virtual Assistant",
      Created: "Jan 12 2024",
    },
  ];
  return (
    <JobTemplate>
      <div className="flex flex-col w-11/12 items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-16">
        <div className="flex flex-row h-12 items-center font-bold text-xl justify-between px-12 w-full bg-white">
          <p>Jobs</p>
          <button className="bg-blue-600 text-lg  text-white shadow-md rounded-md py-2 px-4">
            <Link to="/postJobs">Create</Link>
          </button>
        </div>
        <table className="w-full text-lg text-left rtl:text-right text-gray-500">
          <thead className="text-lg text-gray-400 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {job.Title}
                  </th>
                  <td className="px-6 py-4">{job.Created}</td>
                  <td className="flex gap-x-3 px-6 py-4">
                    <button className="font-medium text-black p-3 bg-slate-300">
                      Edit
                    </button>
                    <button className="font-medium text-black p-3 bg-slate-300">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </JobTemplate>
  );
};

export default Jobs;
