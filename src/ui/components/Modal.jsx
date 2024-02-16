import React from "react";
import Button from "./Button";
import { FaWindowClose } from "react-icons/fa";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start mt-10 justify-center z-50 overflow-auto">
      <div className="bg-gray-300 border-2 rounded-xl border-blue-800 p-6 shadow-lg w-96">
        <div className="flex justify-end inset-0 bg-inherit opacity-50">
          <FaWindowClose onClick={onClose} className="bg-inherit" />
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
