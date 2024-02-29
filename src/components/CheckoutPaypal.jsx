"useClient";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPaypal = () => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "ARxGPZRXhehw8ZPR_DcLN6Hjn02IoVfo68gXE5AdORvBrmSZIoPIebuoRlarYoRUdPWKLdhU74lPHmTa",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal", color: "blue" }}
        createOrder={async () => {
          const res = await fetch("/api/checkout", { method: "POST" });
          const order = await res.json();
          console.log(order);
          return order.id;
        }}
      />
    </PayPalScriptProvider>
  );
};

export default CheckoutPaypal;
//         createOrder={() => {}}
//         onCancel={() => {}}
//         onApprove={() => {}}
