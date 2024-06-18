import React, { useState, useEffect, useRef } from "react";
import {
  Label,
  Input,
  Textarea,
  Button,
  Loading,
  ImageUploader,
} from "@/components";
import { useFetchCompanyProfile, useEditCompanyProfile } from "@/actions";
import { useNavigate } from "react-router-dom";
const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const { isFetching: isCompanyProfileFetching, data: companyProfile } =
    useFetchCompanyProfile();
  const { isEditing, editCompanyProfile } = useEditCompanyProfile();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companyEmail: "",
    website: "",
    profileImage: "",
  });

  useEffect(() => {
    if (companyProfile) {
      setFormData({
        name: companyProfile?.name || "",
        description: companyProfile?.description || "",
        companyEmail: companyProfile?.companyEmail || "",
        website: companyProfile?.website || "",
        profileImage: companyProfile?.profileImage || "",
      });
    }
  }, [companyProfile]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "textarea") {
      setFormData({ ...formData, ["description"]: value });
    } else if (id === "profileImage") {
      const files = e.target.files;
      if (files[0]) {
        // console.log(profileImage);
        setFormData({
          ...formData,
          [id]: files[0],
        });
      }
    } else {
      setFormData({ ...formData, [id]: value.trim() });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Profile = new FormData();

    const originalObject = formData;
    const keysToFilter = ["profileImage"];

    // Filtering out specified keys
    const filteredObject = Object.fromEntries(
      Object.entries(originalObject).filter(
        ([key]) => !keysToFilter.includes(key)
      )
    );
    // console.log(JSON.stringify(filteredObject));
    Profile.append("values", String(JSON.stringify(filteredObject)));
    if (typeof originalObject?.profileImage != "string") {
      Profile.append(
        "profileImage",
        originalObject?.profileImage,
        originalObject?.profileImage?.name
      );
    }
    // for (let [key, value] of Profile.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    editCompanyProfile({ Profile, navigate });
  };
  const imageRef = useRef(null);
  return (
    <div className="min-h-screen font-sans text-lg bg-gray-50 flex flex-col w-full justify-center py-12 sm:px-4 lg:px-6">
      <div className="sm:mx-auto  sm:max-w-6xl">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Edit your Profile
        </h2>
      </div>

      <div className="flex flex-col flex-grow mt-8 w-[4/5]">
        {isCompanyProfileFetching ? (
          <Loading />
        ) : (
          <form
            className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
                ref={imageRef}
                onChange={(e) => handleChange(e)}
              />

              <ImageUploader
                blobUrl={
                  typeof formData.profileImage != "string"
                    ? URL.createObjectURL(formData.profileImage)
                    : formData.profileImage
                }
                containerDims="h-[150px] w-[150px]"
                imageRef={imageRef}
                borderType="rounded-full"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                required={true}
                size="w-full"
                value={formData.name}
                onChange={handleChange}
              ></Input>
            </div>

            <div className="mt-6">
              <Label htmlFor="companyEmail">Email Address</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                placeholder="user@example.com"
                type="email"
                required={true}
                size="w-full"
                value={formData.companyEmail}
                onChange={handleChange}
              ></Input>
            </div>

            <div className="mt-6">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                placeholder="www.example.com"
                type="text"
                required={true}
                size="w-full"
                value={formData.website}
                onChange={handleChange}
              ></Input>
            </div>

            <div className="mt-6">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                type="text"
                required={true}
                placeholder="Enter the description of company's profile"
                value={formData.description}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
                <Button size="w-full" type="submit" disabled={isEditing}>
                  {isEditing ? "Saving Changes" : "Save Profile"}
                </Button>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCompanyProfile;
