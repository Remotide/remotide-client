import React from "react";
import AdminTemplate from "./AdminTemplate";
import Label from "../components/Label";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
const GuideForm = () => {
  return (
    <AdminTemplate>
      <div className="min-h-screen font-sans text-lg bg-gray-50 flex flex-col w-full justify-center py-12 sm:px-4 lg:px-6">
        <div className="sm:mx-auto  sm:max-w-6xl">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            View or Edit your Guide
          </h2>
        </div>

        <div className="flex flex-col flex-grow mt-8 w-[4/5]">
          <form className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the title of your guide"
                type="text"
                required={true}
                size="w-full"
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
              />
            </div>

            <div className="mt-6">
              <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
                <Button size="w-full" type="submit">
                  Submit
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default GuideForm;
