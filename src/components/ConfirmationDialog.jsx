import React, { useState } from "react";
import { Button } from "./index";
const ConfirmDialog = ({ onConfirm, title, label, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={openDialog}
        size="sm:w-fit"
        background="bg-red-500"
        color="text-black"
      >
        {title}
      </Button>

      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-3xl leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {label}
                    </h3>
                    <div className="mt-2">
                      <p className="text-xl text-gray-900 font-bold">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 gap-3 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  size="sm:w-fit"
                  background="bg-red-500"
                  color="text-black"
                  onClick={() => {
                    onConfirm();
                    closeDialog();
                  }}
                >
                  Yes
                </Button>
                <Button size="sm:w-fit" onClick={closeDialog}>
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
