const express = require("express");
const router = express.Router();
const {isauthenticated} = require("../middleware/auth");
const { processPayment, sendApiKey } = require("../controllers/paymentController");

router.route("/payment/process").post(isauthenticated,processPayment)
router.route("/stripeapikey").post(sendApiKey);

module.exports = router;
