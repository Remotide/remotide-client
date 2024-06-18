import React, { useState, useEffect, useRef } from "react";
import {
  Label,
  Textarea,
  Input,
  Button,
  DropDownSelect,
  Loading,
  ImageUploader,
} from "@/components";
import {
  useFetchTalentProfile,
  useEditTalentProfile,
  useFetchAllSkills,
} from "@/actions";
import { Link, useNavigate } from "react-router-dom";
const EditTalentProfile = () => {
  const { isFetching: isSkillsFetching, skills } = useFetchAllSkills();
  const navigate = useNavigate();
  const { isFetching: isTalentProfileFetching, data: talentProfile } =
    useFetchTalentProfile();
  const { isEditing, editTalentProfile } = useEditTalentProfile();
  const [idType, setIdType] = useState("Passport");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (!isTalentProfileFetching || talentProfile) {
      setFormData({
        name: talentProfile?.name || "",
        country: talentProfile?.country || "",
        city: talentProfile?.city || "",
        description: talentProfile?.description || "",
        skills: talentProfile?.skills || [],
        resume: talentProfile?.resume || "",
        profileImage: talentProfile?.profileImage || "",
        bookableCalendarLink: talentProfile?.bookableCalendarLink || "",
        availability: talentProfile?.availability || "",
        idFile: talentProfile?.idFile || "",
        idNo: talentProfile?.idNo || "",
        attachment: talentProfile?.attachment || "",
      });
    }
  }, [talentProfile, isTalentProfileFetching]);
  useEffect(() => {
    if (skills && talentProfile) {
      setSelectedSkills(
        skills.filter((skill) => talentProfile?.skills.includes(skill._id))
      );
    }
  }, [skills, talentProfile]);

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
    if (Object.keys(formData).length !== 0) {
      const { id, value, type, checked } = e.target;
      if (type === "checkbox") {
        setFormData({ ...formData, [id]: checked });
      } else if (id === "resume") {
        const files = e.target.files;
        setFormData({
          ...formData,
          [id]: files[0],
        });
      } else if (id === "attachment") {
        const files = e.target.files;
        setFormData({
          ...formData,
          [id]: files[0],
        });
      } else if (id === "profileImage") {
        const files = e.target.files;
        if (files[0]) {
          // console.log(profileImage);
          setFormData({
            ...formData,
            [id]: files[0],
          });
        }
      } else if (id === "idFile") {
        const files = e.target.files;
        if (files[0]) {
          // console.log(profileImage);
          setFormData({
            ...formData,
            [id]: files[0],
          });
        }
      } else if (type === "textarea") {
        setFormData({ ...formData, ["description"]: value.trim() });
      } else {
        setFormData({ ...formData, [id]: value.trim() });
      }
    }
  };

  const handleSubmit = (e) => {
    // TODO : Input the new input fields inside the form data
    e.preventDefault();
    const Profile = new FormData();

    const skillsIds = selectedSkills.map((skill) => {
      return skill._id;
    });
    const originalObject = { ...formData, skills: skillsIds };
    const keysToFilter = ["resume", "profileImage", "idFile", "attachment"];

    // Filtering out specified keys
    const filteredObject = Object.fromEntries(
      Object.entries(originalObject).filter(
        ([key]) => !keysToFilter.includes(key)
      )
    );
    // console.log(JSON.stringify(filteredObject));
    Profile.append("values", String(JSON.stringify(filteredObject)));
    if (typeof originalObject?.resume != "string") {
      Profile.append(
        "resume",
        originalObject?.resume,
        originalObject?.resume?.name
      );
    }
    if (typeof originalObject?.profileImage != "string") {
      Profile.append(
        "profileImage",
        originalObject?.profileImage,
        originalObject?.profileImage?.name
      );
    }
    if (typeof originalObject?.attachment != "string") {
      Profile.append(
        "attachment",
        originalObject?.attachment,
        originalObject?.attachment?.name
      );
    }
    if (typeof originalObject?.idFile != "string") {
      Profile.append(
        "idFile",
        originalObject?.idFile,
        originalObject?.idFile?.name
      );
    }
    // for (let [key, value] of Profile.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    editTalentProfile({ Profile, navigate });
  };
  const profileImageRef = useRef(null);
  const idFileRef = useRef(null);
  return (
    <div className="flex flex-col items-center w-full  font-sans font-medium">
      <div className="mt-8 w-full max-w-[80%]">
        {isTalentProfileFetching ? (
          <Loading />
        ) : (
          Object.keys(formData).length !== 0 && (
            <form
              className="space-y-2"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create your profile</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Let's get started with some basic information.
                </p>
                <p className="text-red-500 text-2xl py-10">
                  Please ensure that you provide a functioning Calendly booking
                  link; otherwise, employers will not be able to view your
                  profile !
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label
                    className="mb-2 text-sm font-semibold text-primary"
                    htmlFor="profileImage"
                  >
                    Upload Profile Image
                  </Label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={profileImageRef}
                    onChange={(e) => handleChange(e)}
                  />

                  <ImageUploader
                    blobUrl={
                      typeof formData.profileImage != "string"
                        ? URL.createObjectURL(formData.profileImage)
                        : formData.profileImage
                    }
                    containerDims="h-[150px] w-[150px]"
                    imageRef={profileImageRef}
                    borderType="rounded-full"
                  />
                </div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  size="w-full"
                  placeholder="Enter your name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your City"
                  size="w-full"
                  type="text"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Enter your Country"
                  size="w-full"
                  type="text"
                  value={formData.country || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description about yourself"
                  value={formData.description || ""}
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-2/5 items-start text-base font-bold leading-normal">
                <p className="block my-2 sm:text-xl text-base font-bold text-gray-900">
                  Select the type of Identification you want to upload
                </p>
                <div className="flex flex-grow items-center justify-between gap-x-6 rounded-xl border-2 border-solid border-zinc-100 bg-white p-4 backdrop-blur-[2px]">
                  <Button
                    type="button"
                    style={`${
                      idType == "Passport" ? "bg-indigo-500 " : "bg-white"
                    } `}
                    color={`${
                      idType == "Passport" ? "text-white" : "text-black"
                    }`}
                    onClick={() => setIdType("Passport")}
                  >
                    Passport
                  </Button>
                  <Button
                    type="button"
                    style={`${
                      idType == "National ID"
                        ? "bg-indigo-500"
                        : "bg-white text-black"
                    }`}
                    color={`${
                      idType == "National ID" ? "text-white" : "text-black"
                    }`}
                    onClick={() => setIdType("National ID")}
                  >
                    National ID
                  </Button>
                  <Button
                    type="button"
                    style={`${
                      idType == "License"
                        ? "bg-indigo-500"
                        : "bg-white text-black"
                    }`}
                    color={`${
                      idType == "License" ? "text-white" : "text-black"
                    }`}
                    onClick={() => setIdType("License")}
                  >
                    License
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNo">Identification Number</Label>
                <Input
                  id="idNo"
                  placeholder="Enter your Identification Serial Number"
                  size="w-full"
                  type="text"
                  value={formData.idNo || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label
                  className="mb-2 text-sm font-semibold text-primary"
                  htmlFor="profileImage"
                >
                  Upload Identification Document Image (Passport,License or
                  National Id)
                </Label>

                <input
                  id="idFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={idFileRef}
                  onChange={(e) => handleChange(e)}
                />

                <ImageUploader
                  blobUrl={
                    typeof formData?.idFile != "string"
                      ? URL.createObjectURL(formData?.idFile)
                      : formData?.idFile
                  }
                  containerDims="h-[150px] w-[150px]"
                  imageRef={idFileRef}
                  borderType="rounded-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <DropDownSelect
                  name="skills"
                  isFetching={isSkillsFetching}
                  options={skills}
                  removeOptionTag={removeSkillTag}
                  selectedOptions={selectedSkills}
                  handleOptionSelection={handleSkillSelection}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="attachment">Upload your Attachments</Label>
                  <div className="max-w-xs w-full">
                    <Input
                      id="attachment"
                      accept=".pdf"
                      type="file"
                      value={""}
                      onChange={handleChange}
                    />
                    <Link to={formData.attachment || ""} target="_blank">
                      Access Attachments
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Upload your resume</Label>
                  <div className="max-w-xs w-full">
                    <Input
                      id="resume"
                      accept=".pdf"
                      type="file"
                      value={""}
                      onChange={handleChange}
                    />
                    <Link to={formData.resume || ""} target="_blank">
                      Access Resume
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookableCalendarLink">
                    Google Calendar Bookable link
                  </Label>
                  <Input
                    id="bookableCalendarLink"
                    placeholder="Enter your Google Calander Link"
                    size="w-full"
                    type="text"
                    value={formData.bookableCalendarLink || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="availability"
                    type="checkbox"
                    value={formData.availability}
                    onChange={handleChange}
                  />
                  <Label htmlFor="availability">
                    I'm available for new opportunities
                  </Label>
                </div>
                <Button size="w-full" type="submit" disabled={isEditing}>
                  {isEditing ? "Saving Changes" : "Save Profile"}
                </Button>
              </div>
            </form>
          )
        )}
      </div>
    </div>
  );
};

export default EditTalentProfile;
