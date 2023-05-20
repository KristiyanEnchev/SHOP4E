import express from 'express';
import * as orderController from '../Controllers/orderController.js';
import { isAuth } from '../Middleware/authMiddleware.js';
import { noCache } from '../Middleware/cacheMiddleware.js';

const router = express.Router();

router.post('/', isAuth, orderController.CreateOrder);
router.get('/', isAuth, noCache, orderController.GetOrders);
router.get('/stripe-status', noCache, orderController.CheckStripeStatus);

export default router;
