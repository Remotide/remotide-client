import { AiOutlineCloudUpload } from "react-icons/ai";
export default function ImageUploader({
  blobUrl,
  imageRef,
  containerDims = "h-32 w-full",
  borderType = "rounded",
}) {
  return (
    <div
      className={`flex flex-col gap-2 relative bg-main p-2 ${containerDims} ${borderType}`}
    >
      <div
        className={`flex justify-center items-center h-full w-full border-2 border-dashed border-gray-600 cursor-pointer ${borderType}`}
        onClick={() => imageRef?.current?.click()}
      >
        {blobUrl ? (
          <img
            src={blobUrl || ""}
            alt="image"
            width={150}
            height={150}
            className={`h-full w-full object-cover p-3 ${borderType}`}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <AiOutlineCloudUpload className="text-secondary" size={20} />
            {/* <Icon name="HiOutlineCamera" size={20} /> */}
            <div className="text-lg font-semibold text-center text-primary">
              Browse an image to upload
              {/* Select */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
