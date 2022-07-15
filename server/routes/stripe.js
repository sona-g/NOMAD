import express from 'express';
import { createStripeAccount, account, accountBalance, payoutSetting, stripeSessionId, stripeSuccess } from '../controllers/stripe';
import { requireSignin } from '../middlewares'

const router = express.Router();

router.post("/connectstripe", requireSignin, createStripeAccount);
router.post('/account', requireSignin, account);
router.post("/accountbalance", requireSignin, accountBalance);
router.post("/payout", requireSignin, payoutSetting);
router.post("/stripesession", requireSignin, stripeSessionId);
//order
router.post("/stripesuccess", requireSignin, stripeSuccess)


module.exports = router;