import React, { useState } from "react";
import {
  Input,
  Button,
  Textarea,
  Label,
  Select,
  FileUploadPreview,
} from "@/components";
import {
  FaArrowLeft,
  FaDollarSign,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { useCreateContract, getUser } from "@/actions";
import { useNavigate } from "react-router-dom";
// Contract Type Form
const ContractTypeForm = ({ onNext, setContractType }) => {
  const handleSubmit = (contractType) => {
    setContractType(contractType);
    onNext();
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <p className="font-bold text-3xl mb-6">
        Choose your contracting agreement
      </p>
      <div
        onClick={() => handleSubmit("Fixed")}
        className="sm:w-1/3 grid grid-cols-12 justify-around items-center p-5 rounded-3xl bg-slate-50 hover:bg-slate-200"
      >
        <div className="col-span-2 flex flex-row justify-start">
          <FaDollarSign size={22} />
        </div>
        <div className="col-span-8">
          <p className="text-black text-2xl font-extrabold">Fixed Rate</p>
          <p className="font-light leading-tight mt-2">
            For contracts that have a fixed rate each payment cycle.
          </p>
        </div>
        <div className="col-span-2 flex flex-row justify-end">
          <FaChevronRight size={22} />
        </div>
      </div>
      <div
        onClick={() => handleSubmit("Pay As You Go")}
        className="w-1/3 grid grid-cols-12 justify-around items-center p-5 rounded-3xl bg-slate-50 hover:bg-slate-200"
      >
        <div className="col-span-2 flex flex-row justify-start">
          <FaClock size={22} />
        </div>
        <div className="col-span-8">
          <p className="text-black text-2xl font-extrabold">Pay as you go</p>
          <p className="font-light leading-tight mt-2">
            For contracts that require time sheets or work submissions each
            cycle.
          </p>
        </div>
        <div className="col-span-2 flex flex-row justify-end">
          <FaChevronRight size={22} />
        </div>
      </div>
    </div>
  );
};

// Company Details form
const CompanyDetailsForm = ({ onNext, companyDetails, setCompanyDetails }) => {
  const handleChange = (e) => {
    const { id, value, type } = e.target;

    if (type === "textarea") {
      setCompanyDetails({
        ...companyDetails,
        ["responsibilities"]: value.trim(),
      });
    } else {
      setCompanyDetails({ ...companyDetails, [id]: value.trim() });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Fill Out Company and Job Details
      </p>
      <div className="bg-gray-100 p-6 rounded-3xl">
        <p className="text-3xl text-black font-extrabold">
          <span className="text-gray-400">Step 1: </span>Company Details
        </p>
      </div>
      <div>
        <Label htmlFor="contractName">Contract Name</Label>
        <Input
          type="text"
          id="contractName"
          name="contractName"
          required={true}
          size="w-full"
          value={companyDetails?.contractName || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="registrationAddress">Registration Address</Label>
        <Input
          id="registrationAddress"
          name="registrationAddress"
          required={true}
          size="w-full"
          value={companyDetails?.registrationAddress || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="responsibilities">
          Job Responsibilities Description
        </Label>
        <Textarea
          id="responsibilities"
          name="responsibilities"
          value={companyDetails?.responsibilities || ""}
          handleChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

// Payments and Dates form
const PaymentsAndDatesForm = ({
  onNext,
  paymentDetails,
  setPaymentDetails,
  contractType,
}) => {
  const today = new Date();
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    console.log(id, value);
    setPaymentDetails({ ...paymentDetails, [id]: value.trim() });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contractType == "Fixed") {
      setPaymentDetails({
        ...paymentDetails,
        noticePeriodUnit: e.target.elements["noticePeriodUnit"].value,
        paymentFrequency: e.target.elements["paymentFrequency"].value,
        paymentCurrency: e.target.elements["paymentCurrency"].value,
        contractStartDate: e.target.elements["contractStartDate"].value,
        workStartDate: e.target.elements["workStartDate"].value,
      });
    }
    if (contractType == "Pay As You Go") {
      setPaymentDetails({
        ...paymentDetails,
        noticePeriodUnit: e.target.elements["noticePeriodUnit"].value,
        paymentCurrency: e.target.elements["paymentCurrency"].value,
        contractStartDate: e.target.elements["contractStartDate"].value,
        workStartDate: e.target.elements["workStartDate"].value,
      });
    }
    onNext();
  };
  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Fill Out Payment and Date Details
      </p>
      <div className="bg-gray-100 p-6 rounded-3xl">
        <p className="text-3xl text-black font-extrabold">
          <span className="text-gray-400">Step 2: </span>Payment and Date
          Details
        </p>
      </div>
      {/* Date Details */}
      <div className="bg-slate-50 p-5 rounded-3xl space-y-5">
        <p className="text-black font-bold text-3xl">Dates</p>
        <div>
          <p className="leading-tight text-xl font-medium mb-4">
            Select the talent’s start and end date if the contract is for a set
            period.
          </p>
          <div className="flex flex-row space-x-6">
            <Label htmlFor="contractStartDate">Contract Start Date</Label>
            <Input
              type="date"
              id="contractStartDate"
              name="contractStartDate"
              defaultValue={format(parseISO(today.toISOString()), "yyyy-MM-dd")}
              required={true}
              size="w-full"
              value={
                paymentDetails?.contractStartDate
                  ? format(
                      parseISO(paymentDetails?.contractStartDate),
                      "yyyy-MM-dd"
                    )
                  : format(parseISO(today.toISOString()), "yyyy-MM-dd")
              }
              onChange={handleChange}
            />
            <Label htmlFor="contractEndDate">Contract End Date</Label>
            <Input
              type="date"
              id="contractEndDate"
              name="contractEndDate"
              size="w-full"
              value={
                paymentDetails?.contractEndDate
                  ? format(
                      parseISO(paymentDetails?.contractEndDate),
                      "yyyy-MM-dd"
                    )
                  : ""
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="leading-tight text-xl font-medium mb-4">
            Select the talent’s work start date.
          </p>
          <div className="flex flex-row space-x-6">
            <Label htmlFor="workStartDate">Work Start Date</Label>
            <Input
              type="date"
              id="workStartDate"
              name="workStartDate"
              defaultValue={format(parseISO(today.toISOString()), "yyyy-MM-dd")}
              required={true}
              size="w-full"
              value={
                paymentDetails?.workStartDate
                  ? format(
                      parseISO(paymentDetails?.workStartDate),
                      "yyyy-MM-dd"
                    )
                  : format(parseISO(today.toISOString()), "yyyy-MM-dd")
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="leading-tight text-xl font-medium mb-4">
            Payment due within [number of days] after invoice submission.
          </p>
          <div className="flex flex-row space-x-6">
            <Label htmlFor="paymentDue">Payment Due (days)</Label>
            <Input
              type="number"
              id="paymentDue"
              name="paymentDue"
              required={true}
              size="w-full"
              value={paymentDetails?.paymentDue || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="leading-tight text-xl font-medium mb-4">
            Either party may end this contract by giving a specified time of
            notice, after which the contract will be ended.
          </p>
          <div className="flex flex-row items-center align-middle space-x-6">
            <Label htmlFor="noticePeriod">Notice Period</Label>
            <Input
              type="number"
              id="noticePeriod"
              name="noticePeriod"
              required={true}
              size="w-full"
              value={paymentDetails?.noticePeriod || ""}
              onChange={handleChange}
            />
            <div className="w-60">
              <Select
                name="noticePeriodUnit"
                id="noticePeriodUnit"
                options={["Days", "Weeks", "Months"]}
                value={paymentDetails?.noticePeriodUnit || ""}
                onChange={handleChange}
              ></Select>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Details */}
      <div className="p-10 bg-slate-50 rounded-3xl space-y-5">
        <p className="text-black font-bold text-3xl">Payment Details</p>
        <p className="leading-tight text-xl font-medium mb-4">
          Define how much the talent will be paid.
        </p>
        <div className="flex flex-row space-x-6">
          <Label htmlFor="paymentCurrency">Payment Currency</Label>
          <Select
            name="paymentCurrency"
            id="paymentCurrency"
            options={["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "BIRR"]}
            value={paymentDetails?.paymentCurrency || ""}
            onChange={handleChange}
          ></Select>
        </div>
        <div className="flex flex-col space-x-6">
          {contractType === "Fixed" && (
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-2/5">
                <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                <Select
                  name="paymentFrequency"
                  id="paymentFrequency"
                  options={["Monthly", "Weekly"]}
                  value={paymentDetails?.paymentFrequency || ""}
                  onChange={handleChange}
                ></Select>
              </div>
              <div className="flex flex-col w-2/5">
                <Label htmlFor="paymentRate">Payment Rate</Label>
                <Input
                  type="number"
                  id="paymentRate"
                  name="paymentRate"
                  required={true}
                  size="w-full"
                  value={paymentDetails?.paymentRate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {contractType === "Pay As You Go" && (
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-2/5">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <Input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  required={true}
                  size="w-full"
                  value={paymentDetails?.hourlyRate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Label htmlFor="minimumHours">
                  Minimum Hours Before Payment
                </Label>
                <Input
                  type="number"
                  id="minimumHours"
                  name="minimumHours"
                  required={true}
                  size="w-full"
                  value={paymentDetails?.minimumHours || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

// Compliance form
const ComplianceForm = ({
  onSubmit,
  complianceDetails,
  setComplianceDetails,
  isCreating,
}) => {
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    console.log(id);
    if (id === "additionalDocument") {
      const files = e.target.files;
      console.log(files);
      setComplianceDetails({
        ...complianceDetails,
        [id]: files[0],
      });
    } else if (id === "complianceDocument") {
      const files = e.target.files;
      console.log(files);
      if (files[0]) {
        setComplianceDetails({
          ...complianceDetails,
          [id]: files[0],
        });
      }
    } else if (type === "textarea") {
      setComplianceDetails({
        ...complianceDetails,
        ["specialClause"]: value.trim(),
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Fill Out Compliance Details
      </p>
      <div className="bg-gray-100 p-6 rounded-3xl">
        <p className="text-3xl text-black font-extrabold">
          <span className="text-gray-400">Step 3: </span>Compliance Details
        </p>
      </div>
      <div className="flex flex-row items-center w-3/5">
        <Label htmlFor="additionalDocument">Additional Document</Label>
        <FileUploadPreview
          accept=".pdf"
          id="additionalDocument"
          name="additionalDocument"
          onChange={handleChange}
          uploadFile={complianceDetails?.additionalDocument || ""}
          fileRemover={() =>
            setComplianceDetails({
              ...complianceDetails,
              additionalDocument: null,
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="specialClause">Special Clause</Label>
        <Textarea
          id="specialClause"
          name="specialClause"
          value={complianceDetails?.specialClause || ""}
          handleChange={handleChange}
        />
      </div>
      <div className="flex flex-row items-center w-3/5">
        <Label htmlFor="complianceDocument">Compliance Document</Label>
        <FileUploadPreview
          type="file"
          accept=".pdf"
          id="complianceDocument"
          name="complianceDocument"
          uploadFile={complianceDetails?.complianceDocument || ""}
          onChange={handleChange}
          fileRemover={() =>
            setComplianceDetails({
              ...complianceDetails,
              complianceDocument: null,
            })
          }
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isCreating}>
          {!isCreating ? "Submit" : "Creating Contract..."}
        </Button>
      </div>
    </form>
  );
};

// Overall Contract form
const CreateContract = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [contractType, setContractType] = useState("");
  const [companyDetails, setCompanyDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [complianceDetails, setComplianceDetails] = useState({});
  const { createContract, isCreated, isCreating } = useCreateContract();
  const navigate = useNavigate();
  const { _id: id } = getUser();
  const handleNext = () => {
    setCurrentStep((currentStep + 1) % 4);
  };

  const handlePrev = () => {
    setCurrentStep((currentStep - 1) % 4);
  };

  const handleSubmit = (e) => {
    // TODO : here some data processing is required before creating contract
    e.preventDefault();
    const Contract = new FormData();
    const originalObject = {
      contractType,
      ...companyDetails,
      ...paymentDetails,
      ...complianceDetails,
    };
    const keysToFilter = ["additionalDocument", "complianceDocument"];

    // Filtering out specified keys
    const filteredObject = Object.fromEntries(
      Object.entries(originalObject).filter(
        ([key]) => !keysToFilter.includes(key)
      )
    );
    if (originalObject?.additionalDocument) {
      Contract.append(
        "additionalDocuments",
        originalObject?.additionalDocument,
        originalObject?.additionalDocument?.name
      );
    }
    if (originalObject?.complianceDocument) {
      Contract.append(
        "complianceDocuments",
        originalObject?.complianceDocument,
        originalObject?.complianceDocument?.name
      );
    }
    // console.log(JSON.stringify(filteredObject));
    let finalObject = {
      contractType: filteredObject?.contractType,
      contractName: filteredObject?.contractName,
      companyId: id,
      registrationAddress: filteredObject?.registrationAddress,
      contractStartDate: filteredObject?.contractStartDate,
      contractEndDate: filteredObject?.contractEndDate,
      workStartDate: filteredObject?.workStartDate,
      paymentCurrency: filteredObject?.paymentCurrency,
      paymentDue: Number(filteredObject?.paymentDue),
      noticePeriod: {
        value: Number(filteredObject?.noticePeriod),
        unit: filteredObject?.noticePeriodUnit,
      },
      specialClause: filteredObject?.specialClause,
      responsibilities: filteredObject?.responsibilities,
    };
    if (contractType == "Fixed") {
      finalObject["paymentDetail"] = {
        fixed: {
          paymentFrequency: filteredObject?.paymentFrequency,
          payment: Number(filteredObject?.paymentRate),
        },
      };
    }
    if (contractType == "Pay As You Go") {
      finalObject["paymentDetail"] = {
        payAsYouGo: {
          hourlyRate: Number(filteredObject?.hourlyRate),
          minimumHourForPayment: Number(filteredObject?.minimumHours),
        },
      };
    }
    finalObject = Object.entries(finalObject)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    console.log(finalObject);
    Contract.append("values", String(JSON.stringify(finalObject)));
    for (let [key, value] of Contract.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (!isCreating) {
      createContract({ Contract, navigate });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mt-14">
      <p className="font-extrabold text-center text-4xl mb-7">
        Create your Contract
      </p>
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <div
            className={`px-4 py-2 rounded-lg ${
              currentStep === 0 ? "bg-blue-500 text-white" : "bg-transparent"
            }`}
          >
            Contract Type
          </div>
          <div
            className={`px-4 py-2 rounded-lg ${
              currentStep === 1 ? "bg-blue-500 text-white" : "bg-transparent"
            }`}
          >
            Company Details
          </div>
          <div
            className={`px-4 py-2 rounded-lg ${
              currentStep === 2 ? "bg-blue-500 text-white" : "bg-transparent"
            }`}
          >
            Payments and Dates
          </div>
          <div
            className={`px-4 py-2 rounded-lg ${
              currentStep === 3 ? "bg-blue-500 text-white" : "bg-transparent"
            }`}
          >
            Compliance
          </div>
        </div>
        {currentStep > 1 && (
          <Button
            onClick={handlePrev}
            color="black"
            style="bg-transparent hover:bg-gray-200"
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </Button>
        )}
      </div>
      <div className="space-y-6 w-full flex flex-col rounded-lg">
        {currentStep === 0 && (
          <ContractTypeForm
            onNext={handleNext}
            setContractType={setContractType}
          />
        )}
        {currentStep === 1 && (
          <CompanyDetailsForm
            onNext={handleNext}
            onPrev={handlePrev}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        )}
        {currentStep === 2 && (
          <PaymentsAndDatesForm
            onNext={handleNext}
            onPrev={handlePrev}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            contractType={contractType}
          />
        )}
        {currentStep === 3 && (
          <ComplianceForm
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            complianceDetails={complianceDetails}
            setComplianceDetails={setComplianceDetails}
            isCreating={isCreating}
          />
        )}
      </div>
    </div>
  );
};

export default CreateContract;
