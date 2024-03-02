import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutStripe from "./CheckoutStripe";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentFormStripe() {
  const [clientSecret, setClientSecret] = React.useState("");
  const totalPrice = useSelector((state) => state.total);
  const createOrder = async () => {
    const res = await axios.post("/api/checkout-payment-intent", {
      amount: totalPrice,
    });
    console.log(res);
    setClientSecret(res.data.clientSecret);
  };
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("/api/checkout-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    createOrder();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutStripe />
        </Elements>
      )}
    </div>
  );
}
