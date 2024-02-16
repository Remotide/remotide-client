import React from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { FaChevronDown, FaTimes } from "react-icons/fa";
const DropDownSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (value) => {
    setSearchTerm(value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  return (
    <>
      {!isOpen && (
        <Button
          size="w-full"
          background="bg-white"
          onClick={toggleDropdown}
          color="text-black"
          style="flex flex-grow justify-between"
        >
          <>
            Show {props.name}
            <FaChevronDown />
          </>
        </Button>
      )}
      {isOpen && (
        <div className="h-auto w-full bg-white border border-gray-300 rounded-md shadow-md">
          <div className="grid grid-cols-12 items-center justify-center">
            <Input
              size="w-full sm:col-span-11 col-span-10"
              type="text-black"
              placeholder="Search..."
              onChange={(e) => {
                handleSearchInput(e.target.value);
              }}
            />

            <Button
              style="w-full sm:col-span-1 col-span-2"
              background="bg-white"
              color="text-black"
              onClick={toggleDropdown}
            >
              <FaTimes />
            </Button>
          </div>
          <ul className="w-full">
            {props.options
              .filter((value) =>
                value.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((option, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => props.handleOptionSelection(option)}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap p-3 m-2 space-x-2">
        {props.selectedOptions.map((option, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800"
          >
            {option}
            <button
              type="button"
              onClick={() => props.removeOptionTag(option)}
              className="flex-shrink-0 ml-1.5 text-blue-400 hover:text-blue-500"
            >
              <FaTimes />
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default DropDownSelect;
