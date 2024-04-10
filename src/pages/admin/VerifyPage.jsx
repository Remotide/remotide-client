import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCheck, FaBuilding } from "react-icons/fa";
import { Input, ConfirmationDialog, Loading } from "@/components";
import { activateUser, useFetchInActiveUsers } from "@/actions";

const VerifyPage = () => {
  const [talents, setTalents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { data: users, isFetching } = useFetchInActiveUsers();
  const { activateUser: activate, isActivating } = activateUser();
  useEffect(() => {
    if (users) {
      setTalents(users.talents);
      setCompanies(users.companies);
    }
  }, [users, isFetching]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTalents = talents.filter((talent) =>
    talent?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter((company) =>
    company?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const handleActivation = (user) => {
  //   const { _id: id, name, email } = user;
  //   if (
  //     window.confirm(
  //       `Are you sure you want to activate user with name '${name}' and email '${email}' ?`
  //     )
  //   ) {
  //     activate(id);
  //   }
  // };
  return (
    <div className="space-y-4 mx-auto w-full">
      <h1 className="flex flex-row items-center justify-center my-4 text-4xl font-bold text-gray-900">
        Verify Users
      </h1>
      <div className="flex justify-center mt-5">
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search by email"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value.trim())}
        />
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div
          role="tablist"
          className="tabs tabs-boxed items-center bg-white border-0"
        >
          <input
            type="radio"
            name="my_tabs_1"
            className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
            value="talent"
            aria-label="Talent"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-0" value="talent">
            <p className="font-semibold text-xl mt-7">
              Total Talents: {filteredTalents.length}
            </p>
            <div className="grid gap-4 space-x-2 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTalents.map((talent, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-x-8 mx-2 p-3 rounded-lg bg-white border-gray-300 border-2 shadow-lg"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <FaUserCircle size={25} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-semibold">{talent.name}</div>
                      <div className="font-normal">{talent.email}</div>
                      <div className="flex items-center space-x-4">
                        {/* <Button>
                        <FaUser className="w-4 h-4" />
                        <Link to={talent.profileLink}>View Profile</Link>
                      </Button> */}
                        <ConfirmationDialog
                          label="Verify Talent"
                          description={`Are you sure you want to activate user with name '${talent.name}' and email '${talent.email}' ?`}
                          title={
                            <>
                              <FaCheck className="w-4 h-4" /> Verify
                            </>
                          }
                          key={index}
                          onConfirm={() => {
                            !isActivating ? activate(talent._id) : null;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            className="tab text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
            value="company"
            aria-label="Company"
          />
          <div role="tabpanel" className="tab-content p-0" value="company">
            <p className="font-semibold text-xl mt-7">
              Total Companies: {filteredCompanies.length}
            </p>
            <div className="grid gap-4 mx-2 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCompanies.map((company, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-x-8 mx-2 p-3 rounded-lg bg-white border-gray-300 border-1 shadow-lg"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <FaBuilding size={25} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-semibold">{company.name}</div>
                      <div className="font-normal">{company.email}</div>
                      <div className="flex items-center space-x-4">
                        {/* <Button>
                        <FaUser className="w-4 h-4" />
                        <Link to={company.profileLink}>View Profile</Link>
                      </Button> */}
                        <ConfirmationDialog
                          label="Verify Company"
                          description={`Are you sure you want to activate user with name '${company.name}' and email '${company.email}' ?`}
                          title={
                            <>
                              <FaCheck className="w-4 h-4" /> Verify
                            </>
                          }
                          key={index}
                          s
                          onConfirm={() => {
                            !isActivating ? activate(company._id) : null;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
