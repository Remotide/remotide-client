import React, { useState } from "react";
import AdminTemplate from "./AdminTemplate";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Label from "../components/Label";
import { admins } from "../data";

const ManageAdmins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredAdmins = admins.filter((admin) =>
    admin.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <AdminTemplate>
        <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Manage Admins
          </h1>
          <Input
            type="text"
            size="w-4/5"
            placeholder="Search for an admin"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="flex flex-row h-12 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
            <p>Admins</p>
            <Button size="14" onClick={openModal}>
              Create
            </Button>
          </div>
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-400 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-5 py-3 text-base md:text-xl">
                  Admin
                </th>
                <th scope="col" className="px-5 py-3 text-base md:text-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <td
                    scope="row"
                    className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                  >
                    {admin}
                  </td>
                  <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button size="sm:w-20">Edit</Button>
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form>
          <div>
            <Label htmlFor="admin">Admin Name</Label>
            <Input
              id="admin"
              name="admin"
              placeholder="Enter the name of the admin"
              type="text"
              required={true}
              size="w-full"
            ></Input>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter the password"
              type="password"
              required={true}
              size="w-full"
            ></Input>
          </div>
          <div className="mt-6">
            <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
              <Button size="w-full" type="submit">
                Submit
              </Button>
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageAdmins;
