import React, { useState, useEffect } from "react";
import { Button, Input, Loading, ConfirmationDialog } from "@/components";
import { Link } from "react-router-dom";
import { useFetchAllGuides, useDeleteGuide } from "@/actions";
import { truncate } from "@/utils";

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: guides, isFetching: isGuidesFetching } = useFetchAllGuides();
  const { deleteGuide, isDeleting } = useDeleteGuide();
  const [filteredGuides, setFilteredGuides] = useState([]);

  useEffect(() => {
    if (guides) {
      setFilteredGuides(
        guides.filter((guide) =>
          guide.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [guides, searchTerm]);

  // const handleDelete = (guide) => {
  //   const { _id } = guide;
  //   if (window.confirm(`Are you sure you want to delete ${guide.title}?`)) {
  //     deleteGuide(_id);
  //   }
  // };

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Legal Guide</h1>
      <Input
        type="text"
        size="w-4/5"
        placeholder="Search for guide"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="flex flex-row h-12 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
        <p>Guides</p>
        <Button size="14">
          <Link to="/admin/guide">Create</Link>
        </Button>
      </div>
      <table className="w-full text-left rtl:text-right text-gray-500">
        <thead className="text-gray-400 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-3 text-base md:text-xl">
              Guide
            </th>
            <th scope="col" className="px-5 py-3 text-sm md:text-xl">
              Description
            </th>
            <th scope="col" className="px-5 py-3 text-base md:text-xl">
              Actions
            </th>
          </tr>
        </thead>
        {isGuidesFetching || !filteredGuides ? (
          <Loading />
        ) : (
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGuides?.map((guide, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50  border-b"
              >
                <td
                  scope="row"
                  className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                >
                  {guide.title}
                </td>
                <td className="px-4 sm:px-5 py-4 text-sm md:text-xl">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncate(guide.description, 75),
                    }}
                  />
                </td>
                <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                  <Button size="sm:w-20">
                    <Link to={`/admin/guide/${guide._id}`}>Edit</Link>
                  </Button>
                  {/* <Button
                    size="sm:w-20"
                    background="bg-red-500"
                    color="text-black"
                    disabled={isDeleting}
                    onClick={() => handleDelete(guide)}
                  >
                    Delete
                  </Button> */}
                  <ConfirmationDialog
                    label="Delete Guide"
                    description={`Are you sure you want to delete ${guide.title}?`}
                    title="Delete"
                    key={index}
                    onConfirm={() => {
                      !isDeleting ? deleteGuide(guide._id) : null;
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Guides;
