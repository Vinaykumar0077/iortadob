const express = require("express");
const router = express.Router();

const { authenticate } = require("../utility/authprotect");

const {
  orderProduct,
  orderSummery,
} = require("../controller/order/productToUser");

router.put("/order", authenticate, orderProduct);
router.get("/summery", authenticate, orderSummery);
module.exports = router;
