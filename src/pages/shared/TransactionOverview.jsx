import React from "react";
import { useParams, Link } from "react-router-dom";
import { ConfirmationDialog, Loading } from "@/components";
import {
  getUser,
  useFetchTransaction,
  useCreatePaypalPayout,
  useCreateFlutterWaveTransfer,
} from "@/actions";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
const TransactionOverview = () => {
  const user = getUser();
  const { transactionId } = useParams();
  const { data: transaction, isFetching } = useFetchTransaction(transactionId);
  const { createPaypalPayout, isCreating: isCreatingPaypalPayout } =
    useCreatePaypalPayout();
  const {
    createFlutterWaveTransfer,
    isCreating: isCreatingFlutterWaveTransfer,
  } = useCreateFlutterWaveTransfer();
  const navigate = useNavigate();
  return isFetching ? (
    <Loading />
  ) : (
    <div className="flex flex-col pt-20">
      <header className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">{transaction.invoiceName}</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Transaction Details</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Amount</p>
                <p className="font-medium">{transaction.amount}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">View Contract</p>
                <Link
                  to={`/contract/${transaction?.contractId}`}
                  className="font-medium text-blue-700"
                >
                  View
                </Link>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Withdrawal Status</p>
                <p className="font-medium">{transaction.withdrawalStatus}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Created At</p>
                <p className="font-medium">
                  {format(
                    parseISO(transaction.createdAt),
                    "dd MMMM, yyyy h:mm a"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Payment Details</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {transaction.paymentMethod && (
                <div>
                  <p className="text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium">{transaction.paymentMethod}</p>
                </div>
              )}{" "}
              {/* Gross Fee Section */}
              {transaction.paymentDetails?.gross_amount &&
                transaction.paymentMethod == "Paypal" && (
                  <div>
                    <p className="text-gray-500 mb-1">Gross Amount</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.gross_amount.value}{" "}
                      {transaction.paymentDetails.gross_amount.currency_code}
                    </p>
                  </div>
                )}{" "}
              {transaction.paymentDetails?.amount &&
                transaction.paymentMethod == "FlutterWave" && (
                  <div>
                    <p className="text-gray-500 mb-1">Gross Amount</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.amount}{" "}
                      {transaction.paymentDetails.currency}
                    </p>
                  </div>
                )}{" "}
              {/* Fee Section */}
              {transaction.paymentDetails?.paypal_fee &&
                transaction.paymentMethod == "Paypal" && (
                  <div>
                    <p className="text-gray-500 mb-1">PayPal Fee</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.paypal_fee.value}{" "}
                      {transaction.paymentDetails.paypal_fee.currency_code}
                    </p>
                  </div>
                )}{" "}
              {transaction.paymentDetails?.app_fee &&
                transaction.paymentMethod == "FlutterWave" && (
                  <div>
                    <p className="text-gray-500 mb-1">FlutterWave Fee</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.app_fee}{" "}
                      {transaction.paymentDetails.currency}
                    </p>
                  </div>
                )}{" "}
              {/* Net Amount Section */}
              {transaction.paymentDetails?.net_amount &&
                transaction.paymentMethod == "Paypal" && (
                  <div>
                    <p className="text-gray-500 mb-1">Net Amount</p>
                    <p className="font-medium">
                      {" "}
                      {transaction.paymentDetails.net_amount.value}{" "}
                      {transaction.paymentDetails.net_amount.currency_code}
                    </p>
                  </div>
                )}{" "}
              {transaction.paymentDetails?.charged_amount &&
                transaction.paymentMethod == "FlutterWave" && (
                  <div>
                    <p className="text-gray-500 mb-1">Net Amount</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.amount_settled}{" "}
                      {transaction.paymentDetails.currency}
                    </p>
                  </div>
                )}{" "}
              {transaction.paymentDetails?.receivable_amount &&
                transaction.paymentMethod == "Paypal" && (
                  <div>
                    <p className="text-gray-500 mb-1">Receivable Amount</p>
                    <p className="font-medium">
                      {" "}
                      {transaction.paymentDetails.receivable_amount.value}{" "}
                      {
                        transaction.paymentDetails.receivable_amount
                          .currency_code
                      }
                    </p>
                  </div>
                )}{" "}
              {transaction.paymentDetails?.exchange_rate &&
                transaction.paymentMethod == "Paypal" && (
                  <div>
                    <p className="text-gray-500 mb-1">Exchange Rate</p>
                    <p className="font-medium">
                      {" "}
                      1{" "}
                      {transaction.paymentDetails.exchange_rate.source_currency}
                      {" = "}
                      {Number(
                        transaction.paymentDetails.exchange_rate.value
                      ).toFixed(3)}{" "}
                      {transaction.paymentDetails.exchange_rate.target_currency}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          {user.role == "talent" &&
            transaction.withdrawalStatus == "Not Withdrawn" && (
              <div className="flex flex-row space-x-2">
                <ConfirmationDialog
                  label="Withdraw Payment With Paypal"
                  description={`Are you sure you want to withdraw your payment for ${transaction.invoiceName} using Paypal?`}
                  title="Withdraw Payment With Paypal"
                  onConfirm={() => {
                    !isCreatingPaypalPayout
                      ? createPaypalPayout({
                          data: {
                            invoiceId: transaction.invoiceId,
                            transactionId: transaction._id,
                          },
                          navigate,
                        })
                      : null;
                  }}
                />
                <ConfirmationDialog
                  label="Withdraw Payment With FlutterWave"
                  description={`Are you sure you want to withdraw your payment for ${transaction.invoiceName} using Flutterwave ?`}
                  title="Withdraw Payment With FlutterWave"
                  onConfirm={() => {
                    !isCreatingFlutterWaveTransfer
                      ? createFlutterWaveTransfer({
                          data: {
                            invoiceId: transaction.invoiceId,
                            transactionId: transaction._id,
                          },
                          navigate,
                        })
                      : null;
                  }}
                />
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default TransactionOverview;
