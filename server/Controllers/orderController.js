import Stripe from 'stripe';
import expressAsyncHandler from 'express-async-handler';

import orderModel from '../Models/orderModel.js';

let stripe = null;
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (STRIPE_KEY) {
  try {
    stripe = new Stripe(STRIPE_KEY);
  } catch (error) {
    console.warn('Stripe initialization failed:', error);
  }
}

const PRODUCT_PLACEHOLDER =
  'https://camo.githubusercontent.com/f62f3b3838dbd029fcca9aaf48f12ec2e460883adbbe3a5524d11b0d32f3781a/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646d6b6772776a65732f696d6167652f75706c6f61642f76313635393830373530382f73616d706c65732f4e65772532304173736574732f66697273745f6a65703266612e6a7067';

export const CreateOrder = expressAsyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      message: 'Payment service unavailable',
      serviceDisabled: true,
    });
  }
  try {
    const { items, shippingAddress } = req.body;

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order = await orderModel.create({
      user: req.user._id,
      items,
      shippingAddress,
      total,
    });

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      metadata: { orderId: order._id.toString() },
      payment_method_types: ['card'],
      customer_email: req.user.email,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [PRODUCT_PLACEHOLDER],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.origin}/success?order=${order._id}`,
      cancel_url: `${req.headers.origin}/shipping`,
    });

    order.stripeSessionId = session.id;
    await order.save();
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const GetOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const CheckStripeStatus = expressAsyncHandler(async (req, res) => {
  try {
    res.status(200).json({ stripeEnabled: !!stripe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
