import React, { useEffect, useState } from "react";
import { Label, Input, Textarea, Button, Loading } from "@/components";
import { useCreateGuide, useEditGuide, useFetchGuide } from "@/actions";
import { useParams, useNavigate } from "react-router-dom";

const GuideForm = () => {
  const navigate = useNavigate();

  const { guideId } = useParams();
  const status = guideId ? "Edit" : "Create";
  var postGuide, isLoading;

  const { editGuide, isEditing } = useEditGuide();
  const { createGuide, isCreating } = useCreateGuide();

  if (status == "Create") {
    postGuide = createGuide;
    isLoading = isCreating;
  } else {
    postGuide = editGuide;
    isLoading = isEditing;
  }

  const { data: guideFetched } = useFetchGuide(guideId);
  const [guide, setGuide] = useState({});

  useEffect(() => {
    if (guideFetched) {
      setGuide(guideFetched);
    }
  }, [guideFetched]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "textarea") {
      setGuide({ ...guide, ["description"]: value });
    } else {
      setGuide({ ...guide, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postGuide({ values: { ...guide }, navigate });
  };

  return (
    <div className="min-h-screen font-sans text-lg bg-gray-50 flex flex-col w-full justify-center py-12 sm:px-4 lg:px-6">
      <div className="sm:mx-auto  sm:max-w-6xl">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          View or Edit your Guide
        </h2>
      </div>

      <div className="flex flex-col flex-grow mt-8 w-[4/5]">
        {Object.keys(guide).length == 0 ? (
          <Loading />
        ) : (
          <form
            className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the title of your guide"
                type="text"
                required={true}
                size="w-full"
                value={guide.title}
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
                value={guide.description}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
                <Button size="w-full" type="submit" disabled={isLoading}>
                  {status}
                </Button>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GuideForm;
