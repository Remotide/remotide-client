import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCapturePaypalOrder, useCreatePaypalOrder } from "../actions";
import { useNavigate } from "react-router-dom";

const PayPalProvider = ({ invoice }) => {
  const navigate = useNavigate();
  const { createPaypalOrder, isCreated, isCreating, payment } =
    useCreatePaypalOrder();
  const { capturePaypalOrder, isExecuted, isExecuting } =
    useCapturePaypalOrder();
  const captureOrder = (orderId) => {
    if (!isExecuting) {
      console.log(orderId);
      capturePaypalOrder({
        data: {
          orderId: orderId,
          invoiceId: invoice._id,
        },
        navigate,
      });
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": `${import.meta.env.VITE_CLIENT_ID}`,
        currency: invoice.contract.currency,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async (data, actions) => {
          return new Promise((resolve, reject) => {
            // Call createPaypalOrder and handle the onSettled callback
            createPaypalOrder(
              {
                invoiceId: invoice._id, // Replace with actual invoice ID
              },
              {
                onSettled: (response) => {
                  // Resolve the Promise with the response ID
                  resolve(response.id);
                },
                onError: (error) => {
                  reject(error);
                },
              }
            );
          });
        }}
        onApprove={async (data, actions) => {
          captureOrder(data.orderID);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
