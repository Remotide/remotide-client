import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, PayPalProvider, Modal, Label, Input } from "@/components";
import { getUser } from "@/actions";
import { format, parseISO } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { useFetchInvoice, useCreateFlutterWavePayment } from "@/actions";
const InvoiceOverview = () => {
  const { invoiceId } = useParams();
  const { data: invoice, isFetching: isInvoiceFetching } =
    useFetchInvoice(invoiceId);
  const { createFlutterWavePayment, isCreated, isCreating, payment } =
    useCreateFlutterWavePayment();
  const user = getUser();
  const [isFlutterWaveModalOpen, setIsFlutterWaveModalOpen] = useState(false);
  const [flutterWaveInput, setFlutterWaveInput] = useState({});
  const openFlutterWaveModal = () => {
    setIsFlutterWaveModalOpen(true);
  };
  const handlePrint = useReactToPrint({
    content: () => document.getElementById("invoiceContent"),
  });
  const closeFlutterWaveModal = () => {
    setFlutterWaveInput({});
    setIsFlutterWaveModalOpen(false);
  };

  const handleFlutterWaveChange = (e) => {
    const { id, value, type } = e.target;
    setFlutterWaveInput({ ...flutterWaveInput, [id]: value.trim() });
  };

  const handleFlutterWaveSubmit = (e) => {
    e.preventDefault();
    if (flutterWaveInput && !isCreating) {
      new Promise((resolve, reject) => {
        createFlutterWavePayment(
          {
            data: { invoiceId, ...flutterWaveInput },
          },
          {
            onSettled: (response) => {
              window.open(response, "_blank");
            },
            onError: (error) => {
              reject(error);
            },
          }
        );
      });
    }
    closeFlutterWaveModal();
  };
  return (
    <>
      <div className="my-5 space-y-7">
        <div id="invoiceContent">
          {/* Invoice Sender and Receiver*/}
          <p className="text-black font-bold text-5xl text-center">
            Invoice Information
          </p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col  text-black bg-cyan-200 rounded-xl shadow-md px-5">
              <p className="font-semibold text-2xl">From:</p>
              {/* TODO: fetch and place talent information here. */}

              <p className="font-semibold text-2xl text-gray-700">
                {invoice?.talent?.name}
              </p>
              <p className="font-semibold text-2xl text-gray-700">
                {invoice?.talent?.email}
              </p>
            </div>
            <div className="flex flex-col  text-black bg-red-300 rounded-xl shadow-md px-5">
              <p className="font-semibold text-2xl">To:</p>
              {/* TODO: fetch and place company information here. */}

              <p className="font-semibold text-2xl text-gray-700">
                {invoice?.company?.name}
              </p>
              <p className="font-semibold text-2xl text-gray-700">
                {invoice?.company?.email}
              </p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid gap-6 md:grid-cols-1 mt-6 shadow-lg">
            <div className="border rounded-lg p-4 space-y-4">
              <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
                Invoice Details
              </h2>
              <p className="font-semibold text-2xl text-black">
                <span className="text-gray-600">Invoice Name:</span>{" "}
                {invoice?.invoiceName}
              </p>
              <div className="space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="font-semibold text-2xl text-black">
                    <span className="text-gray-600">Issue Date:</span>{" "}
                    {invoice?.issueDate &&
                      format(
                        parseISO(invoice.issueDate),
                        "dd MMMM, yyyy h:mm a"
                      )}
                  </p>
                  <p className="font-semibold text-2xl text-black">
                    <span className="text-gray-600">Due Date:</span>{" "}
                    {invoice?.dueDate &&
                      format(parseISO(invoice.dueDate), "dd MMMM, yyyy h:mm a")}
                  </p>
                </div>

                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Contract Details:</span>{" "}
                  <Link
                    to={`/contract/${invoice?.contractId}`}
                    className="font-medium text-blue-700"
                  >
                    View
                  </Link>
                </p>

                <p className="font-semibold text-2xl text-black">
                  {/* TODO : currency to be fetched from contract */}
                  <span className="text-gray-600">Amount:</span>{" "}
                  {invoice?.amount} {invoice?.contract?.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 space-x-5">
          <div className="flex flex-row justify-around items-center">
            <div className="w-52">
              {user.role == "company" &&
                invoice &&
                invoice.status != "fullyPaid" && (
                  <PayPalProvider invoice={invoice} />
                )}
            </div>
            <div className="w-52">
              {user.role == "company" &&
                invoice &&
                invoice.status != "fullyPaid" && (
                  <Button
                    background="bg-yellow-400 hover:bg-yellow-600"
                    color="text-black"
                    style="h-35"
                    onClick={openFlutterWaveModal}
                  >
                    Pay with Flutterwave
                  </Button>
                )}
            </div>
          </div>
          <Button
            background="bg-green-500 hover:bg-green-700"
            onClick={handlePrint}
          >
            Download Invoice as PDF
          </Button>
        </div>
      </div>
      <Modal isOpen={isFlutterWaveModalOpen} onClose={closeFlutterWaveModal}>
        <p className="font-bold text-2xl py-6">Create FlutterWave payment</p>
        <form onSubmit={handleFlutterWaveSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your Full name"
              type="text"
              required={true}
              size="w-full"
              value={flutterWaveInput.name || ""}
              onChange={handleFlutterWaveChange}
            ></Input>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required={true}
              size="w-full"
              value={flutterWaveInput.email || ""}
              onChange={handleFlutterWaveChange}
            ></Input>
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              type="text"
              required={true}
              size="w-full"
              value={flutterWaveInput.phoneNumber || ""}
              onChange={handleFlutterWaveChange}
            ></Input>
          </div>
          <div className="mt-6">
            <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
              <Button size="w-full" type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InvoiceOverview;
