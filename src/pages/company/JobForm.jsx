import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DropDownSelect,
  Label,
  Input,
  Textarea,
  Button,
  Loading,
} from "@/components";
import {
  useCreateJob,
  useEditJob,
  useFetchJob,
  useFetchAllSkills,
} from "@/actions";

const JobForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const status = jobId ? "Edit" : "Create";
  var postJob, isLoading;
  const { editJob, isEditing } = useEditJob();
  const { createJob, isCreating } = useCreateJob();
  const { isFetching: isAllSkillsFetching, skills } = useFetchAllSkills();

  if (status == "Create") {
    postJob = createJob;
    isLoading = isCreating;
  } else {
    postJob = editJob;
    isLoading = isEditing;
  }

  const { data: jobFetched } = useFetchJob(jobId);
  const [job, setJob] = useState({});

  useEffect(() => {
    setJob(jobFetched);
  }, [jobFetched]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (skills && job?.skills) {
      setSelectedSkills(
        skills.filter((skill) => job?.skills?.includes(skill._id))
      );
    }
  }, [skills, job?.skills]);

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

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "textarea") {
      setJob({ ...job, ["description"]: value });
    } else {
      setJob({ ...job, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsIds = selectedSkills.map((skill) => {
      return skill._id;
    });
    postJob({ values: { ...job, skills: skillsIds }, navigate });
  };

  return (
    <div className="flex font-medium font-sans flex-col w-full items-center justify-center overflow-x-auto sm:rounded-lg mt-8 p-3">
      <div className="w-full bg-white rounded shadow">
        <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
          Job Form
        </div>
        {!job ? (
          <Loading />
        ) : (
          <form className="py-4 px-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                size="w-full"
                type="text"
                placeholder="Enter your Job Title"
                value={job.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="payment">Payment</Label>
              <Input
                size="w-full"
                id="payment"
                placeholder="Enter your payment amount"
                value={job.payment}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="skills">Skills</Label>
              <DropDownSelect
                name="skills"
                isFetching={isAllSkillsFetching}
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
                placeholder="Enter a description about yourself"
                value={job.description}
                handleChange={handleChange}
              />
            </div>
            <div className="flex mt-8">
              <Button type="submit" size="w-full" disabled={isLoading}>
                {status}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobForm;
