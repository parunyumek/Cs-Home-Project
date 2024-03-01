import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

const clientId =
  "ARxGPZRXhehw8ZPR_DcLN6Hjn02IoVfo68gXE5AdORvBrmSZIoPIebuoRlarYoRUdPWKLdhU74lPHmTa";
const clientSecret =
  "ENUSkypRwqarVfI3FFMpuvLxSFmIjjuIOtzLmPBiSFySrKK9MyMXP_ZuDSz8xibgv3wFEjKAbBzq42OK";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        },
        items: [
          {
            name: "Aa",
            description: "Aaaaa",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "50.00",
            },
          },
          {
            name: "Bb",
            description: "Bbbb",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "50.00",
            },
          },
        ],
      },
    ],
  });
  const response = await client.execute(request);
  console.log(response);
  return NextResponse.json({
    id: response.result.id,
  });
}
