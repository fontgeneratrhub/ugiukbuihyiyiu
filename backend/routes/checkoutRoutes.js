const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = process.env.STRIPE_SECRET_KEY;

const stripeClient = new Stripe(stripe);

async function initPaymentIntent(amount) {
  console.log(amount);
  return stripeClient.paymentIntents.create({
    payment_method_types: ["card"],
    amount: amount * 100,
    currency: "usd",
  });
}

router.post("/checkout", async (req, res) => {
  console.log("body: ", req.body);
  const totalCost = req.body.totalCost;

  const paymentIntent = await initPaymentIntent(totalCost);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
