import React, { useState, useEffect } from "react";
import { Button, Loading, ConfirmationDialog } from "@/components";
import { Link } from "react-router-dom";
import {
  useFetchWithdrawalMethods,
  useDeleteWithdrawalMethod,
} from "../../actions";

const WithdrawalMethods = () => {
  const [methodFilter, setMethodFilter] = useState("");
  const { data: withdrawalMethods, isFetching: isWithdrawalsFetching } =
    useFetchWithdrawalMethods();
  const { deleteWithdrawalMethod, isDeleting } = useDeleteWithdrawalMethod();
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);

  useEffect(() => {
    if (withdrawalMethods) {
      setFilteredWithdrawals(
        withdrawalMethods.filter((withdrawal) =>
          withdrawal.method.toLowerCase().includes(methodFilter.toLowerCase())
        )
      );
    }
  }, [withdrawalMethods, methodFilter]);

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Registered Withdrawal methods
      </h1>
      <div className="flex flex-row h-20 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Withdrawal accounts</p>
        <div className="flex flex-row w-60 items-center justify-between">
          <select
            value={methodFilter}
            onChange={(event) => setMethodFilter(event.target.value)}
            className="col-span-2 p-2.5 h-14 w-32 bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          >
            <option value="paypal">Paypal</option>
          </select>
          <Button size="14">
            <Link to="/talent/createWithdrawalMethod">Create</Link>
          </Button>
        </div>
      </div>
      {isWithdrawalsFetching || !filteredWithdrawals ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-gray-400 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Method
              </th>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWithdrawals?.map((withdrawal, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50  border-b"
              >
                <td
                  scope="row"
                  className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                >
                  {withdrawal.method}
                </td>
                <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                  <Button size="sm:w-20">
                    <Link to={`/talent/editWithdrawalMethod/${withdrawal._id}`}>
                      Edit
                    </Link>
                  </Button>
                  <ConfirmationDialog
                    label="Delete Withdrawal Method"
                    description={`Are you sure you want to delete this ${withdrawal.method} withdrawal method?`}
                    title="Delete"
                    key={index}
                    onConfirm={() => {
                      !isDeleting
                        ? deleteWithdrawalMethod(withdrawal._id)
                        : null;
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WithdrawalMethods;
