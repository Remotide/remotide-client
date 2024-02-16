import React, { useState } from "react";
import AdminTemplate from "./AdminTemplate";
import Button from "../components/Button";
import { packages } from "../data";
import { Link } from "react-router-dom";
import Input from "../components/Input";
const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = packages.filter((packageItem) =>
    packageItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <AdminTemplate>
      <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-2 sm:p-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Pricing</h1>
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search for package"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex flex-row h-12 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Packages</p>
          <Button size="14">
            <Link to="/admin/postPackage">Create</Link>
          </Button>
        </div>
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-gray-400 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Package
              </th>
              <th scope="col" className="px-5 py-3 text-sm md:text-xl">
                Description
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Price
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-5 py-3 text-sm md:text-xl"
              >
                Discount
              </th>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPackages.map((packageItem, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50  border-b"
              >
                <td
                  scope="row"
                  className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                >
                  {packageItem.name}
                </td>
                <td className="px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {packageItem.description}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {packageItem.price}
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {packageItem.discount + " %"}
                </td>
                <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                  <Button size="sm:w-20">
                    <Link to="/admin/postPackage">Edit</Link>
                  </Button>
                  <Button
                    size="sm:w-20"
                    background="bg-red-500"
                    color="text-black"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminTemplate>
  );
};

export default Packages;
