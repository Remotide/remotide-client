import { useState } from "react";
import { Input } from "./index";
import { FaTimes } from "react-icons/fa";

const FileUploadPreview = ({
  name,
  onChange,
  uploadFile,
  id,
  accept,
  fileRemover,
}) => {
  const [file, setFile] = useState(uploadFile || null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onChange(event);
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    fileRemover();
  };
  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };
  return (
    <div className="mx-2">
      {file ? (
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl w-2/3">
          <div className="flex items-center space-x-2">
            <span>{file.name}</span>
            <span className="text-gray-500">{formatFileSize(file.size)}</span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Input
            type="file"
            id={id}
            name={name}
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadPreview;
