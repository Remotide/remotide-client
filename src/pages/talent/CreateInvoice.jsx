import React, { useEffect, useState } from "react";
import { Input, Button, Label } from "@/components";
import { useFetchContracts, useCreateInvoice } from "@/actions";
import { useNavigate } from "react-router-dom";
const CreateInvoice = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [selectedContract, setSelectedContract] = useState();
  const { data: contracts, isFetching } = useFetchContracts();
  const { createInvoice, isCreating: isInvoiceCreating } = useCreateInvoice();
  const navigate = useNavigate();
  useEffect(() => {
    if (contracts && !selectedContract) {
      setSelectedContract(
        contracts.filter(
          (contract) => contract.contractType == "Pay As You Go"
        )[0]
      );
    }
  }, [contracts]);
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (id == "contract") {
      setSelectedContract(
        contracts.filter((contract) => contract._id == value)[0]
      );
      console.log(selectedContract);
      setInvoiceDetails({ ...invoiceDetails, ["contractId"]: value });
    } else {
      setInvoiceDetails({ ...invoiceDetails, [id]: value.trim() });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var Invoice;
    if (invoiceDetails.contractId == undefined) {
      Invoice = {
        ...invoiceDetails,
        contractId: e.target.elements["contract"].value || selectedContract._id,
      };
    } else {
      Invoice = invoiceDetails;
    }
    if (!isInvoiceCreating) createInvoice({ Invoice, navigate });
  };
  return (
    <form className="flex flex-col space-y-10 mt-10" onSubmit={handleSubmit}>
      <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Fill Out Invoice Details
      </p>
      <div>
        <Label htmlFor="invoiceName">Invoice Name</Label>
        <Input
          type="text"
          id="invoiceName"
          name="invoiceName"
          required={true}
          size="w-full"
          value={invoiceDetails?.invoiceName || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="contract">Select Contract</Label>
        {isFetching && (
          <p>Wait while contracts you have signed are being fetched.</p>
        )}
        <select
          name="contract"
          id="contract"
          className="mb-2 p-2.5 w-full bg-slate-200 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          onChange={handleChange}
        >
          {contracts &&
            contracts
              .filter(
                (contract) =>
                  contract.status == "OnProgress" &&
                  contract.contractType == "Pay As You Go"
              )
              .map((contract, index) => {
                return (
                  <option key={index} value={contract._id}>
                    {contract.contractName}
                  </option>
                );
              })}
        </select>
      </div>
      <div className="flex flex-col items-start">
        <Label htmlFor="workHours">Invoice Work Hours</Label>
        <div className="flex flex-row items-center w-full gap-x-3">
          <Input
            type="number"
            id="workHours"
            name="workHours"
            required={true}
            size="w-full"
            value={invoiceDetails?.workHours || ""}
            onChange={handleChange}
          />
          {/* <p className="text-2xl font-semibold">
            {selectedContract?.payment_currency}
          </p> */}
        </div>
      </div>
      <div className="flex flex-row w-full">
        <Button size="w-full" type="submit">
          {isInvoiceCreating ? "Creating Invoice..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
};

export default CreateInvoice;
