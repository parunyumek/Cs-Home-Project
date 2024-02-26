import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class PaymentForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    const { token, error } = await this.props.stripe.createToken();

    if (error) {
      console.error(error);
    } else {
      this.props.handlePayment(token);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit">Pay Now</button>
      </form>
    );
  }
}

export default injectStripe(PaymentForm);
