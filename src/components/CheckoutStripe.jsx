import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase";
import { getCookie } from "cookies-next";

import Container from "./Container";

export default function CheckoutStripe() {
  const totalPrice = useSelector((state) => state.total);
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchParams();
  const router = useRouter();
  const services = useSelector((state) => state.services);
  const step = search.get("step") ? parseInt(search.get("step")) : 0;
  const total = useSelector((state) => state.total);
  const address = useSelector((state) => state.address);
  const remainingQuota = useSelector((state) => state.remainingQuota);
  const promotionCode = useSelector((state) => state.promotionCode);
  const userData = getCookie("user");
  const userId = userData ? JSON.parse(userData) : {};

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function generateOrderCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderCode = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderCode += characters.charAt(randomIndex);
    }
    return orderCode;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("promotions")
      .update([
        {
          remaining_quota: Number(remainingQuota) - 1,
        },
      ])
      .eq("promotion_code", promotionCode);

    if (error) {
      console.error(
        "Error inserting data into 'promotion' table:",
        error.message
      );
      return;
    }

    const userData = getCookie("user");
    const userId = userData ? JSON.parse(userData) : {};

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId.id,
          select_services: services,
          total_price: parseInt(total),
          service_date: address.date,
          status: "รอดำเนินการ",
          service_time: `${address.hour}:${address.minute}`,
          province: address.province,
          district: address.amphoe,
          sub_district: address.district,
          address_no: address.address,
          remark: address.more,
          order_code: generateOrderCode(),
        },
      ])
      .select();

    console.log(ordersData);

    router.push("/paymentsuccess");

    if (ordersError) {
      console.error(
        "Error inserting data into 'orders' table:",
        ordersError.message
      );
      return;
    }
  };

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {},
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    setIsLoading(false);
    handleUpdate(e);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="text-white bg-[#2563eb] pb-2.5 pt-2.5 pr-10 pl-10 text-center absolute rounded-xl bottom-1 right-56 z-50"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>{" "}
        <span>{totalPrice} ฿</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
