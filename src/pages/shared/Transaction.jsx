import React, { useState, useEffect } from "react";
import { Input, Label, Loading } from "@/components";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useFetchTransactions } from "@/actions";
import { truncate } from "@/utils";

const Transaction = () => {
  const navigate = useNavigate();
  const today = new Date();
  const { data: transactions, isFetching: isAllTransationsFetching } =
    useFetchTransactions();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
  );
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  useEffect(() => {
    if (transactions && Object.keys(transactions).length != 0) {
      let filtered = transactions;
      if (searchTerm) {
        filtered = transactions.filter((transaction) =>
          transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (statusFilter) {
        filtered = filtered.filter(
          (transaction) => transaction.transactionType === statusFilter
        );
      }
      if (startDate && endDate) {
        filtered = filtered.filter(
          (transaction) =>
            new Date(transaction.createdAt) >= new Date(startDate) &&
            new Date(transaction.createdAt) <= new Date(endDate)
        );
      } else if (startDate) {
        filtered = filtered.filter(
          (transaction) =>
            new Date(transaction.createdAt) >= new Date(startDate)
        );
      } else if (endDate) {
        filtered = filtered.filter(
          (transaction) => new Date(transaction.createdAt) <= new Date(endDate)
        );
      }

      setFilteredTransactions(filtered);
    }
  }, [searchTerm, startDate, endDate, transactions, statusFilter]);

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Transactions Associated with You
      </h1>

      <div className="flex flex-row max-md:flex-col w-full justify-between items-center">
        <Input
          type="text"
          size="w-full"
          style="col-span-8"
          placeholder="Search for Transaction by Invoice name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex flex-row align-middle max-md:mt-5">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="mb-2 p-2.5 w-48 mx-20 bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          >
            <option value="">All Types</option>
            <option value="Payment">Payment</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex flex-row items-center justify-center rounded-md bg-slate-200 border-blue-300 w-48 p-2"
            >
              <FaCalendar size={16} /> Date Filter
            </div>
            <div
              tabIndex={0}
              className="dropdown-content bg-gray-200 rounded-lg flex flex-col p-6"
            >
              <p className="leading-tight text-xl font-medium mb-4">
                Transaction Date
              </p>
              <div className="flex flex-row space-x-6">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={format(startDate, "yyyy-MM-dd")}
                  required={true}
                  size="w-50"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  type="date"
                  id="endDate"
                  value={format(endDate, "yyyy-MM-dd")}
                  name="endDate"
                  size="w-50"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-20 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Transactions</p>
      </div>
      {/*TODO: fetching check to be placed here */}
      {isAllTransationsFetching ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-gray-400 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Name
              </th>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Amount
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Type
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 hover:shadow-lg">
            {filteredTransactions?.map((transaction, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50  border-b"
              >
                <td
                  className="px-4 sm:px-5 py-4 text-sm md:text-xl  text-black hover:underline"
                  onClick={() => navigate(`/transaction/${transaction._id}`)}
                >
                  {truncate(transaction.name, 50)}
                </td>
                <td
                  scope="row"
                  className="px-4 sm:px-5 py-4 font-medium whitespace-nowrap text-base md:text-xl"
                >
                  {transaction.amount}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {transaction.transactionType}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {format(
                    parseISO(transaction.createdAt),
                    "dd MMMM, yyyy h:mm a"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transaction;
