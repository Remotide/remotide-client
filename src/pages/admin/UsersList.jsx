import React, { useState, useEffect } from "react";
import { Input, ConfirmationDialog, Loading } from "@/components";
import { useFetchActiveUsers, deactivateUser } from "@/actions";
const UsersList = () => {
  const [talents, setTalents] = useState([]);
  const [companies, setCompanies] = useState([]);

  const { data: users, isFetching } = useFetchActiveUsers();
  const { deactivateUser: deactivate, isdeactivating } = deactivateUser();
  useEffect(() => {
    if (users) {
      setTalents(users.talents);
      setCompanies(users.companies);
    }
  }, [isFetching, users]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTalents = talents.filter((talent) =>
    talent?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter((company) =>
    company?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const handleDeactivation = (user) => {
  //   const { _id: id, name, email } = user;
  //   if (
  //     window.confirm(
  //       `Are you sure you want to deactivate user with name '${name}' and email '${email}' ?`
  //     )
  //   ) {
  //     deactivate(id);
  //   }
  // };
  return (
    <div className="space-y-4 mx-auto w-full">
      <h1 className="flex flex-row items-center justify-center my-4 text-4xl font-bold text-gray-900">
        Verified Users
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
            <div className="gap-4 space-x-2 mt-12">
              <p className="font-semibold text-xl">
                Total Talents: {filteredTalents.length}
              </p>
              <table className="w-full text-left rtl:text-right text-gray-500">
                <thead className=" text-gray-400 uppercase bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-base md:text-xl max-[450px]:hidden"
                    >
                      Talent name
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Email Address
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTalents.map((talent, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-50  border-b"
                      >
                        <th
                          scope="row"
                          className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl max-[450px]:hidden"
                        >
                          <p>{talent.name}</p>
                        </th>
                        <td className="px-4 sm:px-5 py-4 text-base md:text-xl">
                          {talent.email}
                        </td>
                        <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                          {/* <Button
                          size="sm:w-30"
                          background="bg-red-500"
                          color="text-black"
                          onClick={() => handleDeactivation(talent)}
                          disabled={isdeactivating}
                        >
                          Deactivate
                        </Button> */}
                          <ConfirmationDialog
                            label="Deactivate Talent"
                            description={`Are you sure you want to de-activate user with name '${talent.name}' and email '${talent.email}' ?`}
                            title={`Deactivate Talent`}
                            key={index}
                            onConfirm={() => {
                              !isdeactivating ? deactivate(talent._id) : null;
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
            <div className="gap-4 space-x-2 mt-12">
              <p className="font-semibold text-xl">
                Total Companies: {filteredCompanies.length}
              </p>
              <table className="w-full text-left rtl:text-right text-gray-500">
                <thead className=" text-gray-400 uppercase bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-base md:text-xl max-[450px]:hidden"
                    >
                      Company name
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Email Address
                    </th>
                    <th scope="col" className="px-5 py-3 text-base md:text-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-50  border-b"
                      >
                        <th
                          scope="row"
                          className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl max-[450px]:hidden"
                        >
                          <p>{company.name}</p>
                        </th>
                        <td className="px-4 sm:px-5 py-4 text-base md:text-xl">
                          {company.email}
                        </td>
                        <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                          {/* <Button
                          size="sm:w-30"
                          background="bg-red-500"
                          color="text-black"
                          onClick={() => handleDeactivation(company)}
                          disabled={isdeactivating}
                        >
                          Deactivate
                        </Button> */}
                          <ConfirmationDialog
                            label="Deactivate Company"
                            description={`Are you sure you want to de-activate user with name '${company.name}' and email '${company.email}' ?`}
                            title={`Deactivate Company`}
                            key={index}
                            onConfirm={() => {
                              !isdeactivating ? deactivate(company._id) : null;
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
