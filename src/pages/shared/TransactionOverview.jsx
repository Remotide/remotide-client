import React from "react";
import { useParams, Link } from "react-router-dom";
import { Loading } from "@/components";
import { getUser, useFetchTransaction } from "@/actions";
import { format, parseISO } from "date-fns";
const TransactionOverview = () => {
  const { transactionId } = useParams();
  const { data: transaction, isFetching } = useFetchTransaction(transactionId);

  return isFetching ? (
    <Loading />
  ) : (
    <div className="flex flex-col pt-20">
      <header className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">{transaction.name}</h1>
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
              {transaction?.contractId && (
                <div>
                  <p className="text-gray-500 mb-1">View Contract</p>
                  <Link
                    to={`/contract/${transaction.contractId}`}
                    className="font-medium text-blue-700"
                  >
                    View
                  </Link>
                </div>
              )}
              <div>
                <p className="text-gray-500 mb-1">Transaction Type</p>
                <p className="font-medium">{transaction.transactionType}</p>
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
              {transaction.transactionMethod && (
                <div>
                  <p className="text-gray-500 mb-1">Transaction Method</p>
                  <p className="font-medium">{transaction.transactionMethod}</p>
                </div>
              )}

              {transaction.transactionType === "Payment" && (
                <>
                  {/* Gross Amount Section */}
                  {transaction.paymentDetails?.gross_amount &&
                    transaction.transactionMethod === "Paypal" && (
                      <div>
                        <p className="text-gray-500 mb-1">Gross Amount</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.gross_amount.value}{" "}
                          {
                            transaction.paymentDetails.gross_amount
                              .currency_code
                          }
                        </p>
                      </div>
                    )}

                  {transaction.paymentDetails?.amount &&
                    transaction.transactionMethod === "FlutterWave" && (
                      <div>
                        <p className="text-gray-500 mb-1">Gross Amount</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.amount}{" "}
                          {transaction.paymentDetails.currency}
                        </p>
                      </div>
                    )}

                  {/* Fee Section */}
                  {transaction.paymentDetails?.paypal_fee &&
                    transaction.transactionMethod === "Paypal" && (
                      <div>
                        <p className="text-gray-500 mb-1">PayPal Fee</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.paypal_fee.value}{" "}
                          {transaction.paymentDetails.paypal_fee.currency_code}
                        </p>
                      </div>
                    )}

                  {transaction.paymentDetails?.app_fee &&
                    transaction.transactionMethod === "FlutterWave" && (
                      <div>
                        <p className="text-gray-500 mb-1">FlutterWave Fee</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.app_fee}{" "}
                          {transaction.paymentDetails.currency}
                        </p>
                      </div>
                    )}

                  {/* Net Amount Section */}
                  {transaction.paymentDetails?.net_amount &&
                    transaction.transactionMethod === "Paypal" && (
                      <div>
                        <p className="text-gray-500 mb-1">Net Amount</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.net_amount.value}{" "}
                          {transaction.paymentDetails.net_amount.currency_code}
                        </p>
                      </div>
                    )}

                  {transaction.paymentDetails?.charged_amount &&
                    transaction.transactionMethod === "FlutterWave" && (
                      <div>
                        <p className="text-gray-500 mb-1">Net Amount</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.amount_settled}{" "}
                          {transaction.paymentDetails.currency}
                        </p>
                      </div>
                    )}

                  {/* Receivable Amount Section */}
                  {transaction.paymentDetails?.receivable_amount &&
                    transaction.transactionMethod === "Paypal" && (
                      <div>
                        <p className="text-gray-500 mb-1">Receivable Amount</p>
                        <p className="font-medium">
                          {transaction.paymentDetails.receivable_amount.value}{" "}
                          {
                            transaction.paymentDetails.receivable_amount
                              .currency_code
                          }
                        </p>
                      </div>
                    )}

                  {/* Exchange Rate Section */}
                  {transaction.paymentDetails?.exchange_rate &&
                    transaction.transactionMethod === "Paypal" && (
                      <div>
                        <p className="text-gray-500 mb-1">Exchange Rate</p>
                        <p className="font-medium">
                          {" "}
                          {
                            transaction.paymentDetails.exchange_rate
                              .source_currency
                          }
                          {" = "}
                          {Number(
                            transaction.paymentDetails.exchange_rate.value
                          ).toFixed(3)}{" "}
                          {
                            transaction.paymentDetails.exchange_rate
                              .target_currency
                          }
                        </p>
                      </div>
                    )}
                </>
              )}
              {transaction.transactionType === "Withdrawal" && (
                <>
                  <div>
                    <p className="text-gray-500 mb-1">App Fee</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.app_fee}{" "}
                      {transaction.paymentDetails.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Total Amount</p>
                    <p className="font-medium">
                      {transaction.paymentDetails.amount_settled}{" "}
                      {transaction.paymentDetails.currency}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionOverview;
