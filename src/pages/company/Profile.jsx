import React from "react";
import { ImageUploader, Loading, Button } from "@/components";
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { useFetchCompanyProfile } from "@/actions";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
const ViewCompanyProfile = () => {
  const { isFetching: isCompanyProfileFetching, data: companyProfile } =
    useFetchCompanyProfile();
  return (
    <>
      <div className="flex flex-col w-full space-y-2 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Company profile</h1>
        <div className="flex flex-grow flex-row items-center justify-between">
          <p className="text-gray-500 text-2xl dark:text-gray-400">
            Here's your basic information.
          </p>
          <Button size="h-14 ">
            <Link to="/company/editProfile">Edit Profile</Link>
          </Button>
        </div>
      </div>
      {isCompanyProfileFetching ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {companyProfile?.profileImage ? (
                <ImageUploader
                  blobUrl={companyProfile?.profileImage || ""}
                  containerDims="h-[96px] w-[96px]"
                  borderType="rounded-full"
                />
              ) : (
                <FaUserAlt size={96} />
              )}
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold">
                {companyProfile?.name}
              </h1>
              <div className="flex items-center space-x-2 text-xl font-semibold">
                <FaEnvelope className="w-4 h-4 flex-shrink-0" />
                <p>{companyProfile?.companyEmail || "Email is not set"}</p>
              </div>
              <div className="flex items-center space-x-2 text-xl font-semibold">
                <FaGlobe className="w-4 h-4 flex-shrink-0" />
                <p>{companyProfile?.website || "Website is not set"}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-0.5 mt-7">
            <div className="text-2xl font-bold">Description</div>
            {companyProfile?.description ? (
              <div
                className="p-6 font-"
                dangerouslySetInnerHTML={{
                  __html: companyProfile?.description,
                }}
              />
            ) : (
              <p>You havenot filled the description field.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCompanyProfile;
