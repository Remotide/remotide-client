import Remotide from "../assets/remotide.svg";
import Home from "../assets/Home.svg";
import User from "../assets/user-circle.svg";
import Calander from "../assets/calender-alt-2.svg";
import UserAlt from "../assets/user-alt-4.svg";
import Selection from "./Selection";
import JobTemplate from "./JobTemplate";
const JobsForm = () => {
  return (
    <JobTemplate>
      <div className="flex font-medium font-sans flex-col w-full items-center justify-center overflow-x-auto sm:rounded-lg mt-8 p-3">
        <div className="w-full bg-white rounded shadow">
          <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
            Job Form
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-grey-darker mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="email"
                type="text"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-grey-darker mb-2" htmlFor="skills">
                Skills
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="skills"
                type="text"
                placeholder="Select your skills"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-grey-darker mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="appearance-none border rounded h-52 w-full py-2 px-3 text-grey-darker"
                id="description"
                type="text"
                placeholder="Type your job description"
              />
            </div>
            <div className="flex mt-8">
              <button
                className="flex w-full items-center justify-center bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </JobTemplate>
  );
};

export default JobsForm;
