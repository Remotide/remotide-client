import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  Label,
  Loading,
  ConfirmationDialog,
} from "@/components";
import {
  useFetchAllAdmins,
  useFetchAdmin,
  useCreateAdmin,
  useEditAdmin,
  useDeleteAdmin,
} from "@/actions";
const ManageAdmins = () => {
  const { isFetching: isAllAdminsFetching, data: admins } = useFetchAllAdmins();
  const { createAdmin, isCreating } = useCreateAdmin();
  const { editAdmin, isEditing } = useEditAdmin();
  const { deleteAdmin, isDeleting } = useDeleteAdmin();
  const [selectedAdmin, setSelectedAdmin] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAdmin({ _id: "", name: "", email: "", password: "" });
    setIsModalOpen(false);
  };

  const [filteredAdmins, setFilteredAdmins] = useState([]);

  useEffect(() => {
    if (admins) {
      setFilteredAdmins(
        admins.filter((admin) =>
          admin?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [admins, searchTerm]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setSelectedAdmin({ ...selectedAdmin, [id]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedAdmin._id
      ? editAdmin({ values: { ...selectedAdmin } })
      : createAdmin({ values: { ...selectedAdmin } });
    closeModal();
  };

  // const handleDelete = (admin) => {
  //   const { _id: id, name } = admin;
  //   if (window.confirm(`Are you sure you want to delete ${name}?`)) {
  //     deleteAdmin(id);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Manage Admins</h1>
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search for an admin"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value.trim())}
        />
        <div className="flex flex-row h-12 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Admins</p>
          <Button size="14" onClick={openModal}>
            Create
          </Button>
        </div>
        {isAllAdminsFetching ? (
          <Loading />
        ) : (
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
                    {admin.name}
                  </td>
                  <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button
                      size="sm:w-20"
                      onClick={() => {
                        const { password, ...filteredAdmin } = admin;
                        setSelectedAdmin(filteredAdmin);
                        openModal();
                      }}
                    >
                      Edit
                    </Button>
                    {/* <Button
                      size="sm:w-20"
                      background="bg-red-500"
                      color="text-black"
                      onClick={() => handleDelete(admin)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button> */}
                    <ConfirmationDialog
                      label="Delete Admin"
                      description={`Are you sure you want to delete admin with name ${admin.name} ?`}
                      title="Delete"
                      key={index}
                      onConfirm={() => {
                        !isDeleting ? deleteAdmin(admin._id) : null;
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Admin Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter the name of the admin"
              type="text"
              required={true}
              size="w-full"
              value={selectedAdmin.name || ""}
              onChange={handleChange}
            ></Input>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter the email of the admin"
              type="email"
              required={true}
              value={selectedAdmin.email || ""}
              size="w-full"
              onChange={handleChange}
            ></Input>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter the password"
              type="password"
              required={false}
              value={""}
              size="w-full"
              onChange={handleChange}
            ></Input>
          </div>
          <div className="mt-6">
            <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
              <Button
                size="w-full"
                type="submit"
                disabled={selectedAdmin._id ? isEditing : isCreating}
              >
                {selectedAdmin._id ? "Edit" : "Create"}
              </Button>
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageAdmins;
