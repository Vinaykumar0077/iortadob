const ProductSchema = require("../../Model/product");
const createProductController = async (req, res) => {
  try {
    const productDetails = req.body;
    const product = await ProductSchema.create(productDetails);
    if (product) {
      res
        .status(200)
        .json({ message: "product created successfully", product });
    } else {
      res.status(400).json({ message: "error while creating product" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProductController };
