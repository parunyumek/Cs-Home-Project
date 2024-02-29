"useClient"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const  CheckoutPaypal = () => {
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );
}

export default CheckoutPaypal