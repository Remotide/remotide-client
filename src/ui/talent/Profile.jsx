import React, { useState } from "react";
import TalentTemplate from "./TalentTemplate";
import Label from "../components/Label";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import Button from "../components/Button";
import { skills } from "../data";
import DropDownSelect from "../components/DropDownSelect";
const TalentProfile = () => {
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
    <TalentTemplate>
      <div className="flex flex-col items-center w-full  font-sans font-medium">
        <div className="mt-8 w-full max-w-[80%]">
          <form className="space-y-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Create your profile</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Let's get started with some basic information
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-semibold">Name</Label>
              <Input id="Name" size="w-full" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter your location"
                size="w-full"
                type="text"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description about yourself"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <DropDownSelect
                name="Skills"
                options={skills}
                removeOptionTag={removeSkillTag}
                selectedOptions={selectedSkills}
                handleOptionSelection={handleSkillSelection}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Upload your resume</Label>
                <div className="max-w-xs w-full">
                  <Input id="resume" accept=".pdf" type="file" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="calendar">Google Calendar Bookable link</Label>
                <Input
                  id="calendar"
                  placeholder="Enter your Google Calander Link"
                  size="w-full"
                  type="text"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input id="available" type="checkbox" />
                <Label htmlFor="available">
                  I'm available for new opportunities
                </Label>
              </div>
              <Button size="w-full" type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </TalentTemplate>
  );
};

export default TalentProfile;
