import express from 'express';
import * as controller from '../Controllers/stripeController.js';

const router = express.Router();
router.post('/', controller.CreateCheckoutSession);

export default router;
