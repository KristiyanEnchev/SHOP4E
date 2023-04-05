import express from 'express';
import * as orderController from '../Controllers/orderController.js';
import { isAuth } from '../Middleware/Auth.js';

const router = express.Router();

router.post('/', isAuth, orderController.CreateOrder);
router.get('/', isAuth, orderController.GetOrders);
router.get('/stripe-status', orderController.CheckStripeStatus);

export default router;
