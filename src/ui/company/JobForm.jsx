import DropDownSelect from "../components/DropDownSelect";
import CompanyTemplate from "./CompanyTemplate";
import Label from "../components/Label";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import { useState } from "react";
import { skills } from "../data";
const JobForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelection = (option) => {
    const selectedOption = option;
    if (!selectedSkills.includes(selectedOption))
      setSelectedSkills([...selectedSkills, selectedOption]);
  };

  const removeSkillTag = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <CompanyTemplate>
      <div className="flex font-medium font-sans flex-col w-full items-center justify-center overflow-x-auto sm:rounded-lg mt-8 p-3">
        <div className="w-full bg-white rounded shadow">
          <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
            Job Form
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                size="w-full"
                type="text"
                placeholder="Enter your Job Title"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="payment">Payment</Label>
              <Input
                size="w-full"
                id="payment"
                placeholder="Enter your payment amount"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="skills">Skills</Label>
              <DropDownSelect
                name="Skills"
                options={skills}
                removeOptionTag={removeSkillTag}
                selectedOptions={selectedSkills}
                handleOptionSelection={handleSkillSelection}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                type="text"
                placeholder="Type your job description"
              />
            </div>
            <div className="flex mt-8">
              <Button type="submit" size="w-full">
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CompanyTemplate>
  );
};

export default JobForm;
