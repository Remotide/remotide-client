import React, { useState, useEffect } from "react";
import { Input, Label, Button, Loading } from "@/components";
import { FaPlus, FaCalendar } from "react-icons/fa";
import { getUser } from "@/actions";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useFetchInvoices } from "@/actions";
const Invoices = () => {
  const user = getUser();
  const navigate = useNavigate();
  const today = new Date();
  const { data: invoices, isFetching: isAllInvoicesFetching } =
    useFetchInvoices();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
  );
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  useEffect(() => {
    if (invoices && Object.keys(invoices).length != 0) {
      let filtered = invoices;
      if (searchTerm) {
        filtered = invoices.filter((invoice) =>
          invoice.invoiceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (statusFilter) {
        filtered = filtered.filter(
          (invoice) => invoice.status === statusFilter
        );
      }
      if (startDate && endDate) {
        filtered = filtered.filter(
          (invoice) =>
            new Date(invoice.issueDate) >= new Date(startDate) &&
            new Date(invoice.issueDate) <= new Date(endDate)
        );
      } else if (startDate) {
        filtered = filtered.filter(
          (invoice) => new Date(invoice.issueDate) >= new Date(startDate)
        );
      } else if (endDate) {
        filtered = filtered.filter(
          (invoice) => new Date(invoice.issueDate) <= new Date(endDate)
        );
      }

      setFilteredInvoices(filtered);
    }
  }, [searchTerm, startDate, endDate, invoices, statusFilter]);

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Invoices Associated with You
      </h1>

      <div className="flex flex-row w-full justify-between items-center">
        <Input
          type="text"
          size="w-full"
          style="col-span-8"
          placeholder="Search for Invoice by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="mb-2 p-2.5 w-48 mx-20 bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
        >
          <option value="">All Statuses</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Overdue">Overdue</option>
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
              Invoice Issue Date
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

      <div className="flex flex-row h-20 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Invoices</p>
        {user.role == "talent" && (
          <Button size="14">
            <FaPlus />
            <Link to="/talent/createInvoice">Create</Link>
          </Button>
        )}
      </div>
      {/*TODO: fetching check to be placed here */}
      {isAllInvoicesFetching ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-gray-400 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Invoice Name
              </th>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                {user.role == "talent" ? "Company" : "Talent"}
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Contract Name
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Amount
              </th>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 hover:shadow-lg">
            {filteredInvoices?.map((invoice, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50  border-b"
              >
                <td
                  className="px-4 sm:px-5 py-4 text-sm md:text-xl  text-black hover:underline"
                  onClick={() => navigate(`/invoice/${invoice._id}`)}
                >
                  {invoice.invoiceName}
                </td>
                <td
                  scope="row"
                  className="px-4 sm:px-5 py-4 font-medium whitespace-nowrap text-base md:text-xl"
                >
                  {user.role == "talent"
                    ? invoice.company.name
                    : invoice.talent.name}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {invoice.contract.name}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {invoice.amount}
                </td>
                <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                  {user.role == "company" && invoice.status != "fullyPaid" && (
                    <Button>
                      <Link to="">Pay Invoice</Link>
                    </Button>
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

export default Invoices;
