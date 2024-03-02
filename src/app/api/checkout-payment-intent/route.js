// This is your test secret API key.
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const body = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: +body.amount * 100,
    payment_method_types: ["card", "promptpay"],
    currency: "THB",
  });
  console.log(paymentIntent);

  return NextResponse.json(
    {
      clientSecret: paymentIntent.client_secret,
    },
    { status: 200 }
  );
}
// export default async function handler(req, res) {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "eur",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });

// };
