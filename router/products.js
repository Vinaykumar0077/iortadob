const express = require("express");
const router = express.Router();

const {
  createProductController,
} = require("../controller/products/createProducts");
const {
  getProductController,
  getProductsController,
} = require("../controller/products/getProducts");

router.post("/create", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductController);

module.exports = router;
