import React from "react";
import AdminTemplate from "./AdminTemplate";
import Label from "../components/Label";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
const PackageForm = () => {
  return (
    <AdminTemplate>
      <div className="min-h-screen font-sans text-lg bg-gray-50 flex flex-col w-full justify-center py-12 sm:px-4 lg:px-6">
        <div className="sm:mx-auto  sm:max-w-6xl">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            View or Edit your Package
          </h2>
        </div>

        <div className="flex flex-col flex-grow mt-8 w-[4/5]">
          <form className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter the name of your package"
                type="text"
                required={true}
                size="w-full"
              ></Input>
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="Enter the price of your package"
                type="number"
                required={true}
                size="w-full"
              ></Input>
            </div>
            <div>
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                name="discount"
                placeholder="Enter the discount percentage"
                type="number"
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

export default PackageForm;
