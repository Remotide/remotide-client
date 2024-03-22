import React, { useState, useEffect } from "react";
import { Label, Input, Textarea, Button, Loading } from "@/components";
import { useCreatePackage, useEditPackage, useFetchPackage } from "@/actions";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
const PackageForm = () => {
  const navigate = useNavigate();

  const { packageId } = useParams();
  const status = packageId ? "Edit" : "Create";
  var postPackage, isLoading;

  const { editPackage, isEditing } = useEditPackage();
  const { createPackage, isCreating } = useCreatePackage();

  if (status == "Create") {
    postPackage = createPackage;
    isLoading = isCreating;
  } else {
    postPackage = editPackage;
    isLoading = isEditing;
  }

  const { data: packageFetched } = useFetchPackage(packageId);
  const [packageItem, setPackageItem] = useState({});
  useEffect(() => {
    if (packageFetched) {
      setPackageItem({
        name: packageFetched.name,
        description: packageFetched.description,
        ...packageFetched.discount,
      });
    }
  }, [packageFetched]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "textarea") {
      setPackageItem({ ...packageItem, ["description"]: value });
    } else {
      setPackageItem({ ...packageItem, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      originalPrice,
      startDate,
      endDate,
      discountPercentage,
    } = packageItem;
    postPackage({
      values: {
        _id: packageId,
        packageDetails: { name, description },
        discountDetails: {
          originalPrice,
          startDate,
          endDate,
          discountPercentage,
        },
      },
      navigate,
    });
  };

  return (
    <div className="min-h-screen font-sans text-lg bg-gray-50 flex flex-col w-full justify-center py-12 sm:px-4 lg:px-6">
      <div className="sm:mx-auto  sm:max-w-6xl">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          View or Edit your Package
        </h2>
      </div>

      <div className="flex flex-col flex-grow mt-8 w-[4/5]">
        {Object.keys(packageItem).length == 0 ? (
          <Loading />
        ) : (
          <form
            className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter the name of your package"
                type="text"
                required={true}
                size="w-full"
                value={packageItem?.name}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                placeholder="Enter the original price of your package"
                type="number"
                required={true}
                size="w-full"
                value={packageItem?.originalPrice}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <Label htmlFor="discountPercentage">Discount</Label>
              <Input
                id="discountPercentage"
                placeholder="Enter the discount percentage"
                type="number"
                required={true}
                size="w-full"
                value={packageItem?.discountPercentage}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                placeholder="Enter the start date for the discount"
                type="datetime-local"
                required={true}
                size="w-full"
                value={
                  packageItem?.startDate
                    ? format(
                        parseISO(packageItem?.startDate),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
                // value={new Date(
                //   packageItem?.discount?.startDate
                // ).toLocaleString()}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                placeholder="Enter the end date for the discount"
                type="datetime-local"
                required={true}
                size="w-full"
                value={
                  packageItem?.endDate
                    ? format(
                        parseISO(packageItem?.endDate),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
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
                value={packageItem?.description}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
                <Button size="w-full" type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PackageForm;
