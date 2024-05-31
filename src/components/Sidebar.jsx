import React from "react";
import Remotide from "@/assets/remotide.svg";
import { Link } from "react-router-dom";
import { Selection } from "@/components";
import {
  FaGraduationCap,
  FaUser,
  FaUserCheck,
  FaBook,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaUserAlt,
  FaBriefcase,
  FaGavel,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillWave,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const { role } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const colorPicker = (pathname) => {
    if (
      location.pathname
        .toLowerCase()
        .includes(pathname.toLowerCase().replaceAll(" ", ""))
    ) {
      return "black";
    } else {
      return "white";
    }
  };
  const backgroundPicker = (pathname) => {
    return colorPicker(pathname) == "white" ? "gray-800" : "gray-100";
  };
  return (
    <div className="fixed top-0 z-50 lg:w-1/5 max-w-md w-full h-full flex flex-col max-h-screen overflow-auto items-center self-stretch bg-inherit px-3.5  pt-10 drop-shadow-lg">
      {role == "talent" ? (
        <>
          <div
            onClick={() => {
              navigate("/talent");
            }}
          >
            <img
              className="mr-6 h-24 w-24 object-contain object-center"
              src={Remotide}
            />
            <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
              Remotide
            </div>
          </div>
          {/* <div className="flex flex-col pt-48"> */}
          {/* <Selection background="gray-800" color="white" padding="l">
              <FaBriefcase /> <Link to="/jobs">Jobs</Link>
            </Selection> */}
          <Selection
            background={backgroundPicker("profile")}
            color={colorPicker("profile")}
            padding="l"
          >
            <FaUserAlt /> <Link to="/talent/profile">Profile</Link>
          </Selection>
          <Selection
            background={backgroundPicker("contract")}
            color={colorPicker("contract")}
            padding="l"
          >
            <FaFileContract />
            <Link to="/contracts">Contracts</Link>
          </Selection>
          <Selection
            background={backgroundPicker("invoice")}
            color={colorPicker("invoice")}
            padding="l"
          >
            <FaFileInvoice />
            <Link to="/invoices">Invoices</Link>
          </Selection>
          <Selection
            background={backgroundPicker("withdrawal")}
            color={colorPicker("withdrawal")}
            padding="l"
          >
            <FaMoneyBillWave />
            <Link to="/talent/withdrawalMethods">Withdrawal Method</Link>
          </Selection>
          <Selection
            background={backgroundPicker("transaction")}
            color={colorPicker("transaction")}
            padding="l"
          >
            <FaHandHoldingUsd />
            <Link to="/transaction">Transactions</Link>
          </Selection>
          {/* </div> */}
        </>
      ) : role == "company" ? (
        <>
          <div
            onClick={() => {
              navigate("/company");
            }}
          >
            <img
              className="mr-6 h-24 w-24 object-contain object-center"
              src={Remotide}
            />
            <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
              Remotide
            </div>
          </div>
          <Selection
            background={backgroundPicker("profile")}
            color={colorPicker("profile")}
            padding="l"
          >
            <FaUserAlt /> <Link to="/company/profile">Profile</Link>
          </Selection>
          <Selection
            background={backgroundPicker("job")}
            color={colorPicker("job")}
            padding="l"
          >
            <FaBriefcase /> <Link to="/company/jobs">View Jobs</Link>
          </Selection>
          <Selection
            background={backgroundPicker("compliance")}
            color={colorPicker("compliance")}
            padding="l"
          >
            <FaGavel />
            <Link to="/company/legalCompliance">Legal Compliance</Link>
          </Selection>
          <Selection
            background={backgroundPicker("contract")}
            color={colorPicker("contract")}
            padding="l"
          >
            <FaFileContract />
            <Link to="/contracts">Contracts</Link>
          </Selection>
          <Selection
            background={backgroundPicker("invoice")}
            color={colorPicker("invoice")}
            padding="l"
          >
            <FaFileInvoice />
            <Link to="/invoices">Invoices</Link>
          </Selection>
          <Selection
            background={backgroundPicker("transaction")}
            color={colorPicker("transaction")}
            padding="l"
          >
            <FaHandHoldingUsd />
            <Link to="/transaction">Transactions</Link>
          </Selection>
        </>
      ) : role == "admin" || role == "superadmin" ? (
        <>
          <div
            onClick={() => {
              navigate("/admin");
            }}
          >
            <img
              className="mr-6 h-24 w-24 object-contain object-center"
              src={Remotide}
            />
            <div className="flex items-center pr-7 pb-9 text-left font-bold text-zinc-400">
              Remotide
            </div>
          </div>
          {/* <div className="flex flex-col pt-28"> */}
          <Selection
            background={backgroundPicker("verification")}
            color={colorPicker("verification")}
            padding="l"
          >
            <FaUserCheck />
            <Link to="/admin/verification">Verification</Link>
          </Selection>
          <Selection
            background={backgroundPicker("users")}
            color={colorPicker("users")}
            padding="l"
          >
            <FaUser />
            <Link to="/admin/users">Users</Link>
          </Selection>
          <Selection
            background={backgroundPicker("stats")}
            color={colorPicker("stats")}
            padding="l"
          >
            <FaChartBar />
            <Link to="/admin/stats">Stats</Link>
          </Selection>
          <Selection
            background={backgroundPicker("allJobs")}
            color={colorPicker("allJobs")}
            padding="l"
          >
            <FaBriefcase />
            <Link to="/admin/allJobs">All Jobs</Link>
          </Selection>
          <Selection
            background={backgroundPicker("contract")}
            color={colorPicker("contract")}
            padding="l"
          >
            <FaFileContract />
            <Link to="/contracts">All Contracts</Link>
          </Selection>
          {role == "superadmin" && (
            <Selection
              background={backgroundPicker("manageAdmins")}
              color={colorPicker("manageAdmins")}
              padding="l"
            >
              <FaCog />
              <Link to="/admin/manageAdmins">Admins</Link>
            </Selection>
          )}
          <Selection
            background={backgroundPicker("guide")}
            color={colorPicker("guide")}
            padding="l"
          >
            <FaBook />
            <Link to="/admin/guides">Guides</Link>
          </Selection>
          <Selection
            background={backgroundPicker("skill")}
            color={colorPicker("skill")}
            padding="l"
          >
            <FaGraduationCap />
            <Link to="/admin/skills">Skills</Link>
          </Selection>
          <Selection
            background={backgroundPicker("package")}
            color={colorPicker("package")}
            padding="l"
          >
            <FaDollarSign />
            <Link to="/admin/packages">Packages</Link>
          </Selection>
          <Selection
            background={backgroundPicker("transaction")}
            color={colorPicker("transaction")}
            padding="l"
          >
            <FaHandHoldingUsd />
            <Link to="/transaction">Transactions</Link>
          </Selection>
          {/* </div> */}
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
