import React, { useState, useEffect } from "react";
import { Button, Input, Loading } from "@/components";
import { Link } from "react-router-dom";
import { getUser, useFetchContracts } from "@/actions";
const Contracts = () => {
  const user = getUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { data: contracts, isFetching: isAllContractsFetching } =
    useFetchContracts();
  const [filteredContracts, setFilteredContracts] = useState([]);
  useEffect(() => {
    if (contracts && Object.keys(contracts).length != 0) {
      console.log(contracts);
      setFilteredContracts(
        contracts.filter(
          (contract) =>
            contract.contractName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) &&
            (!statusFilter || contract.status === statusFilter) &&
            (!typeFilter || contract.contractType === typeFilter)
        )
      );
    }
  }, [contracts, searchTerm, statusFilter, typeFilter]);
  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Contracts Associated with You
      </h1>
      <div className="flex flex-row max-md:flex-col w-full justify-between items-center">
        <Input
          type="text"
          size="w-full"
          style="col-span-8"
          placeholder="Search for contract by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex flex-row align-middle max-md:mt-5">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="mb-2 p-2.5 w-48 mx-20 bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          >
            <option value="">All Statuses</option>
            <option value="Unsigned">Unsigned</option>
            <option value="OnProgress">OnProgress</option>
            <option value="Terminated">Terminated</option>
          </select>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="col-span-2 mb-2 p-2.5 w-48 bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          >
            <option value="">All Types</option>
            <option value="Fixed">Fixed</option>
            <option value="Pay As You Go">Pay as you go</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row h-20 mt-10 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Contracts</p>
        {user.role == "company" && (
          <Button size="14">
            <Link to="/company/createContract">Create</Link>
          </Button>
        )}
      </div>
      {isAllContractsFetching ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className=" text-gray-400 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Contract Name
              </th>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Type
              </th>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b group"
                >
                  <th
                    scope="row"
                    className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-sm md:text-xl"
                  >
                    <Link
                      to={`/contract/${contract._id}`}
                      className="group-hover:underline"
                    >
                      {contract.contractName}
                    </Link>
                  </th>
                  <td className="px-4 sm:px-5 py-4 text-sm md:text-xl">
                    {contract.contractType}
                  </td>
                  <td className="px-4 sm:px-5 py-4 text-sm md:text-xl">
                    {contract.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contracts;
