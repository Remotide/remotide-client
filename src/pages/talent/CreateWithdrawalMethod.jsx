import React, { useState } from "react";
import { Input, Button, Label, Select } from "@/components";
import {
  useCreateWithdrawalMethod,
  getUser,
  useFetchFlutterWaveBanks,
} from "../../actions";

import { useNavigate } from "react-router-dom";

const PayPalPaymentDetailsForm = ({
  onSubmit,
  paypalPaymentDetails,
  setPaypalPaymentDetails,
}) => {
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    console.log(e.target);
    setPaypalPaymentDetails({ ...paypalPaymentDetails, [id]: value.trim() });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(onSubmit);
    onSubmit(event);
  };
  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-10">
        <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
          Fill out Paypal Withdrawal details
        </p>
      </div>
      <div>
        <Label htmlFor="paypalEmail">
          Fill out the email you used to create your paypal account
        </Label>
        <Input
          type="email"
          id="paypalEmail"
          name="paypalEmail"
          required={true}
          size="w-full"
          value={paypalPaymentDetails.paypalEmail || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

const FlutterWavePaymentDetailsForm = ({
  onSubmit,
  flutterWavePaymentDetails,
  setFlutterWavePaymentDetails,
}) => {
  const handleChange = (e, name) => {
    const { value } = e.target;
    setFlutterWavePaymentDetails({
      ...flutterWavePaymentDetails,
      [name]: value.trim(),
    });
  };
  const handleSubmit = (event) => {
    if (!flutterWavePaymentDetails.account_bank) {
      flutterWavePaymentDetails.account_bank =
        event.target.elements["account_bank"].value;
    }
    if (!flutterWavePaymentDetails.account_country) {
      flutterWavePaymentDetails.account_country =
        event.target.elements["account_country"].value;
    }
    event.preventDefault();
    onSubmit(event);
  };
  const [selectedCountry, setSelectedCountry] = useState("NG");
  console.log(selectedCountry);
  const { data: banks, isFetching } = useFetchFlutterWaveBanks(selectedCountry);
  const countries = {
    NG: "Nigeria",
    GH: "Ghana",
    KE: "Kenya",
    ZA: "South Africa",
    TZ: "Tanzania",
    RW: "Rwanda",
    ET: "Ethiopia",
    EG: "Egypt",
    MW: "Malawi",
    SL: "Sierra Leone",
    US: "United States",
  };
  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-10">
        <p className="font-bold text-3xl text-gray-800 mb-6 text-center">
          Fill out FlutterWave Withdrawal details
        </p>
      </div>
      <div>
        <Label htmlFor="account_country">
          Select the country of your bank account
        </Label>
        <select
          id="account_country"
          className="mb-2 p-2.5 w-full bg-slate-50 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
          required={true}
        >
          {Object.entries(countries).map(([code, name]) => {
            return (
              <option
                value={code}
                selected={selectedCountry === code}
                onClick={(e) => {
                  setSelectedCountry(code);
                  handleChange(e, "account_country");
                }}
              >
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <Label htmlFor="account_bank">
          Select the country of your bank account
        </Label>
        {!isFetching && (
          <select
            id="account_bank"
            className="mb-2 p-2.5 w-full bg-slate-50 border-blue-300 rounded-lg sm:text-2xl text-base focus:border-blue-700 focus:ring-blue-700"
            required={true}
          >
            {banks.map((bank) => {
              return (
                <option
                  value={bank.code}
                  selected={
                    flutterWavePaymentDetails.account_bank === bank.code
                  }
                  onClick={(e) => handleChange(e, "account_bank")}
                >
                  {bank.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div>
        <Label htmlFor="account_number">Fill out your account number</Label>
        <Input
          type="text"
          id="account_number"
          name="account_number"
          required={true}
          size="w-full"
          value={flutterWavePaymentDetails.account_number || ""}
          onChange={(e) => handleChange(e, "account_number")}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

const CreateWithdrawalMethod = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState("Paypal");
  const [paypalPaymentDetails, setPaypalPaymentDetails] = useState({});
  const [flutterWavePaymentDetails, setFlutterWavePaymentDetails] = useState(
    {}
  );
  const { createWithdrawalMethod, isCreated, isCreating } =
    useCreateWithdrawalMethod();
  const navigate = useNavigate();
  const { _id: id } = getUser();
  const handleSubmit = (e) => {
    var accountDetails;
    if (withdrawalMethod == "Paypal") {
      accountDetails = paypalPaymentDetails;
    }
    if (withdrawalMethod == "FlutterWave") {
      accountDetails = flutterWavePaymentDetails;
    }
    if (!isCreating) {
      createWithdrawalMethod({
        Withdrawal: { userId: id, method: withdrawalMethod, accountDetails },
        navigate,
      });
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mt-14">
      <p className="font-extrabold text-center text-4xl mb-7">
        Create your Withdrawal Method
      </p>

      <div className="space-y-6 w-full flex flex-col rounded-lg">
        <Select
          name="withdrawalMethod"
          id="withdrawalMethod"
          options={["Paypal", "FlutterWave"]}
          value={withdrawalMethod || ""}
          onChange={(e) => {
            setWithdrawalMethod(e.target.value);
          }}
        ></Select>
        {withdrawalMethod === "Paypal" && (
          <PayPalPaymentDetailsForm
            onSubmit={handleSubmit}
            paypalPaymentDetails={paypalPaymentDetails}
            setPaypalPaymentDetails={setPaypalPaymentDetails}
          />
        )}
        {withdrawalMethod === "FlutterWave" && (
          <FlutterWavePaymentDetailsForm
            onSubmit={handleSubmit}
            flutterWavePaymentDetails={flutterWavePaymentDetails}
            setFlutterWavePaymentDetails={setFlutterWavePaymentDetails}
          />
        )}
      </div>
    </div>
  );
};

export default CreateWithdrawalMethod;
