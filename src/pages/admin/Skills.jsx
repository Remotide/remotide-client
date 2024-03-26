import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Modal,
  Label,
  Loading,
  ConfirmationDialog,
} from "@/components";
import {
  useCreateSkill,
  useFetchAllSkills,
  useEditSkill,
  useDeleteSkill,
} from "@/actions";

const Skills = () => {
  const { isFetching: isAllSkillsFetching, skills } = useFetchAllSkills();
  const { createSkill, isCreating } = useCreateSkill();
  const { editSkill, isEditing } = useEditSkill();
  const { deleteSkill, isDeleting } = useDeleteSkill();
  const [selectedSkill, setSelectedSkill] = useState({ _id: "", name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSkill({ _id: "", name: "" });
    setIsModalOpen(false);
  };

  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (skills) {
      setFilteredSkills(
        skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [skills, searchTerm]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setSelectedSkill({ ...selectedSkill, [id]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedSkill._id
      ? editSkill({ values: { ...selectedSkill } })
      : createSkill({ values: { name: selectedSkill.name } });
    closeModal();
  };

  // const handleDelete = (skill) => {
  //   const { _id } = skill;
  //   if (window.confirm(`Are you sure you want to delete ${skill.name}?`)) {
  //     deleteSkill(_id);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center overflow-x-auto shadow-lg sm:rounded-lg mt-8 p-4 sm:p-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Skills</h1>
        <Input
          type="text"
          size="w-4/5"
          placeholder="Search skills"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value.trim())}
        />
        <div className="flex flex-row h-12 mt-5 items-center font-bold text-base md:text-3xl justify-between px-3 md:px-12 w-full bg-white">
          <p>Skills</p>
          <Button size="14" onClick={openModal}>
            Create
          </Button>
        </div>
        {isAllSkillsFetching ? (
          <Loading />
        ) : (
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-400 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-5 py-3 text-base md:text-xl">
                  Skill
                </th>
                <th scope="col" className="px-5 py-3 text-base md:text-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSkills.map((skill, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <td
                    scope="row"
                    className="px-4 sm:px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-base md:text-xl"
                  >
                    {skill.name}
                  </td>
                  <td className="flex gap-x-3 md:px-6 md:py-4 px-3 py-2">
                    <Button
                      size="sm:w-20"
                      onClick={() => {
                        setSelectedSkill(skill);
                        openModal();
                      }}
                    >
                      Edit
                    </Button>
                    {/* <Button
                      size="sm:w-20"
                      background="bg-red-500"
                      color="text-black"
                      onClick={() => handleDelete(skill)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button> */}
                    <ConfirmationDialog
                      label="Delete Skill"
                      description={`Are you sure you want to delete ${skill.name}?`}
                      title="Delete"
                      key={index}
                      onConfirm={() => {
                        !isDeleting ? deleteSkill(skill._id) : null;
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter the name of the skill"
              type="text"
              required={true}
              size="w-full"
              value={selectedSkill.name || ""}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="mt-6">
            <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
              <Button
                size="w-full"
                type="submit"
                disabled={selectedSkill._id ? isEditing : isCreating}
              >
                {selectedSkill._id ? "Edit" : "Create"}
              </Button>
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Skills;
