import express from 'express';
import SSLCommerzPayment from 'sslcommerz-lts';
import userAuth from '../middlewares/auth.js';
import { plans } from '../assets/paymentPlan.js';

const paymentRouter = express.Router();

paymentRouter.post('/init', userAuth, async (req, res) => {
  const { planId } = req.body;
  const userId = req.user.id;

  // Validate plan
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }

  // SSLCommerz config
  const store_id = process.env.SSLCOMMERZ_STORE_ID;
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWD;
  const is_live = false; // true for live, false for sandbox

  const data = {
    total_amount: plan.price,
    currency: 'BDT',
    tran_id: `${userId}_${Date.now()}`,
    success_url: `https://your-backend.com/api/payment/success`,
    fail_url: `https://your-backend.com/api/payment/fail`,
    cancel_url: `https://your-backend.com/api/payment/cancel`,
    product_name: plan.name,
    cus_name: 'Customer Name',
    cus_email: 'customer@email.com',
    cus_add1: 'Address',
    cus_phone: '01711111111',
    // ...other required fields
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then(apiResponse => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ url: GatewayPageURL });
  });
});

export default paymentRouter;