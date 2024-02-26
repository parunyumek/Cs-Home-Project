import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentForm from './PaymentForm';

class App extends React.Component {
  handlePayment = async (token) => {
    // ส่ง token ไปยัง server ของคุณเพื่อทำการชำระเงิน
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log('Payment successful');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  render() {
    return (
      <StripeProvider apiKey="YOUR_PUBLISHABLE_KEY">
        <Elements>
          <PaymentForm handlePayment={this.handlePayment} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default App;
