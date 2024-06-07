import React, { useState } from "react";
import { Input, Label, Loading, ConfirmationDialog } from "@/components";
import {
  useFetchBalance,
  useCreatePaypalPayout,
  useCreateFlutterWaveTransfer,
} from "@/actions";
import { useNavigate } from "react-router-dom";
const Balance = () => {
  const currencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "BIRR"];
  const paymentMethods = ["Paypal", "FlutterWave"];
  const [withdrawalDetails, setWithdrawalDetails] = useState({
    amount: 0,
    currency: "USD",
    paymentMethod: "Paypal",
  });
  const { isFetching, data: balance } = useFetchBalance();
  const { createPaypalPayout, isCreating: isCreatingPaypalPayout } =
    useCreatePaypalPayout();
  const {
    createFlutterWaveTransfer,
    isCreating: isCreatingFlutterWaveTransfer,
  } = useCreateFlutterWaveTransfer();
  const navigate = useNavigate();
  const handleChange = (e, name) => {
    console.log(name);
    console.log(e);
    const { value } = e.target;
    setWithdrawalDetails({
      ...withdrawalDetails,
      [name]: value.trim(),
    });
  };
  const handleWithdrawal = () => {
    if (
      withdrawalDetails.paymentMethod === "Paypal" &&
      !isCreatingPaypalPayout
    ) {
      createPaypalPayout({
        data: {
          amount: withdrawalDetails.amount,
          currency: withdrawalDetails.currency,
        },
        navigate,
      });
    }
    if (
      withdrawalDetails.paymentMethod === "FlutterWave" &&
      !isCreatingFlutterWaveTransfer
    ) {
      createFlutterWaveTransfer({
        data: {
          amount: withdrawalDetails.amount,
          currency: withdrawalDetails.currency,
        },
        navigate,
      });
    }
  };
  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col">
        <header className="bg-gray-900 text-white py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Balance</h1>
          </div>
        </header>
      </div>

      {/* Main Element */}
      {isFetching ? (
        <Loading />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Balance Card */}
          <div className="col-span-2 lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              {/* Intro to balance Card */}
              <div className="px-6 py-5 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Balance
                </h3>
              </div>
              {/* Balance Cards */}
              <div className="p-6 space-y-4">
                {/* Balance Card */}
                {balance &&
                  Object.entries(balance.balance).map(([key, value]) => {
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div className="text-gray-500">{key}</div>
                        <div className="text-2xl font-semibold text-gray-900">
                          {value}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-5 border-b ">
                <h3 className="text-lg font-semibold text-gray-900">
                  Withdraw Funds
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="mb-4">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      size="w-full"
                      value={withdrawalDetails.amount || ""}
                      onChange={(e) => handleChange(e, "amount")}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="currency">Select Currency</Label>
                    <select
                      id="currency"
                      className="mb-2 p-2.5 w-full bg-slate-50 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
                      required={true}
                      onChange={(e) => handleChange(e, "currency")}
                    >
                      {currencies.map((currency) => {
                        return (
                          <option
                            value={currency}
                            key={currency}
                            // selected={withdrawalDetails.currency === currency}
                          >
                            {currency}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="paymentMethod">Select Payment Method</Label>
                    <select
                      id="paymentMethod"
                      className="mb-2 p-2.5 w-full bg-slate-50 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
                      required={true}
                      onChange={(e) => handleChange(e, "paymentMethod")}
                    >
                      {paymentMethods.map((method) => {
                        return (
                          <option
                            value={method}
                            key={method}
                            selected={
                              withdrawalDetails.paymentMethod === method
                            }
                          >
                            {method}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-4 flex flex-col items-center">
                    {withdrawalDetails.amount > 0 &&
                      withdrawalDetails.currency &&
                      withdrawalDetails.paymentMethod && (
                        <ConfirmationDialog
                          label={`Withdraw with ${withdrawalDetails.paymentMethod}`}
                          description={`Are you sure you want to withdraw ${withdrawalDetails.amount} ${withdrawalDetails.currency} using ${withdrawalDetails.paymentMethod}?`}
                          title="Withdraw Money"
                          onConfirm={() => handleWithdrawal()}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;
