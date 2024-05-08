import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components";
import { getUser } from "@/actions";
import { format, parseISO } from "date-fns";
import { useFetchInvoice } from "../../actions";
const InvoiceOverview = () => {
  const { invoiceId } = useParams();
  const { data: invoice, isFetching: isInvoiceFetching } =
    useFetchInvoice(invoiceId);
  return (
    <div className="my-5 space-y-7">
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
                  format(parseISO(invoice.issueDate), "yyyy-MM-dd")}
              </p>
              <p className="font-semibold text-2xl text-black">
                <span className="text-gray-600">Due Date:</span>{" "}
                {invoice?.dueDate &&
                  format(parseISO(invoice.dueDate), "yyyy-MM-dd")}
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
              <span className="text-gray-600">Amount:</span> {invoice?.amount}{" "}
              {invoice?.contract?.currency}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 space-x-5">
        <Button background="bg-green-500 hover:bg-green-700">
          Download Invoice as PDF
        </Button>
      </div>
    </div>
  );
};

export default InvoiceOverview;
