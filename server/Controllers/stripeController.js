import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';

let stripe = null;
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (STRIPE_KEY) {
  try {
    stripe = new Stripe(STRIPE_KEY);
  } catch (error) {
    console.warn('Stripe initialization failed:', error);
  }
}
export const CreateCheckoutSession = expressAsyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      message: 'Payment service unavailable',
      serviceDisabled: true,
    });
  }
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        // shipping_options: [{ shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' }],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', '').replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
