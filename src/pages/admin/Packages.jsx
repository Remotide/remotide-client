import React, { useState, useEffect } from "react";
import { Button, Input, Loading, ConfirmationDialog } from "@/components";
import { Link } from "react-router-dom";
import { useFetchAllPackages, useDeletePackage } from "@/actions";
import { truncate } from "@/utils";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: packages, isFetching: isPackagesFetching } =
    useFetchAllPackages();
  const { deletePackage, isDeleting } = useDeletePackage();
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    if (packages) {
      setFilteredPackages(
        packages.filter((packageItem) =>
          packageItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [packages, searchTerm]);

  // const handleDelete = (packageItem) => {
  //   const { _id } = packageItem;
  //   if (
  //     window.confirm(`Are you sure you want to delete ${packageItem.name}?`)
  //   ) {
  //     deletePackage(_id);
  //   }
  // };

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-2 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Pricing Packages
      </h1>
      <Input
        type="text"
        size="w-4/5"
        placeholder="Search for package"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value.trim())}
      />
      <div className="flex flex-row h-20 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Packages</p>
        <Button size="14">
          <Link to="/admin/package">Create</Link>
        </Button>
      </div>
      {isPackagesFetching ? (
        <Loading />
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-gray-400 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-base md:text-xl">
                Package
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm md:text-xl max-md:hidden"
              >
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
            {filteredPackages?.map((packageItem, index) => (
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
                <td className="px-4 sm:px-5 py-4 text-sm md:text-xl max-md:hidden">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncate(packageItem.description, 75),
                    }}
                  />
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  <del>{packageItem.discount.originalPrice} </del>
                  <span>{packageItem.discount.discountedPrice}</span>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-5 py-4 text-sm md:text-xl">
                  {packageItem.discount.discountPercentage + " %"}
                </td>
                <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                  <Button size="sm:w-20">
                    <Link to={`/admin/package/${packageItem._id}`}>Edit</Link>
                  </Button>
                  {/* <Button
                    size="sm:w-20"
                    background="bg-red-500"
                    color="text-black"
                    onClick={() => {
                      handleDelete(packageItem);
                    }}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button> */}
                  <ConfirmationDialog
                    label="Delete Package"
                    description={`Are you sure you want to delete ${packageItem.name}?`}
                    title="Delete"
                    key={index}
                    onConfirm={() => {
                      !isDeleting ? deletePackage(packageItem._id) : null;
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

export default Packages;
