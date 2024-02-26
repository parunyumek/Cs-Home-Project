import Stripe from 'stripe';

const stripe = new Stripe('YOUR_SECRET_KEY', { apiVersion: '2020-08-27' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const charge = await stripe.charges.create({
        amount: 1000, // Amount in cents
        currency: 'usd',
        description: 'Example Charge',
        source: token,
      });

      res.status(200).json({ status: 'success', message: 'Payment successful' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
