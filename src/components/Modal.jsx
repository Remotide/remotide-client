import React from "react";
import { FaWindowClose } from "react-icons/fa";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start mt-10 justify-center z-50 h-fit">
      <div className="bg-gray-200 border-2 rounded-xl border-white p-6 shadow-lg w-1/3 m-auto">
        <div className="flex justify-end inset-0 bg-inherit">
          <FaWindowClose onClick={onClose} size={20} className="bg-inherit" />
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
