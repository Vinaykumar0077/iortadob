const ProductSchema = require("../../Model/product");

const getProductsController = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    if (products) {
      res.status(200).json({ message: "All Product Details", products });
    } else {
      res.status(404).json({ message: "Products Doesn't Exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductSchema.findById(id);
    if (product) {
      res.status(200).json({ message: "Product Details", product });
    } else {
      res.status(404).json({ message: "Product Doesn't Exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductsController, getProductController };
