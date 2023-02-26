const authSchema = require("../../Model/auth");
const ProductSchema = require("../../Model/product");

const orderProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductSchema.findById(productId);
    if (req.user.balance >= product.price) {
      const balance = req.user.balance - product.price;
      console.log(req.user.products.includes(productId));
      if (!req.user.products.includes(productId)) {
        const user = await authSchema.updateOne(
          { _id: req.user._id },
          { balance, $push: { products: productId } },
          { new: true, useFindAndModify: false }
        );
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).json({ message: "error while ordering product" });
        }
      } else {
        res.status(400).json({ message: "product already ordered" });
      }
    } else {
      res.status(500).json({ message: "Insufficient Balance" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductSchema.findById(productId);
    const balance = +req.user.balance + +product.price;
    const user = await authSchema.updateOne(
      { _id: req.user._id },
      { balance, $pull: { products: productId } }
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "error while ordering product" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const orderSummery = async (req, res) => {
  try {
    const orderData = await authSchema
      .findById(req.user._id)
      .populate("products");
    if (orderData) {
      res.status(200).json(orderData);
    } else {
      res.status(400).json({ message: "you don't have any order" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderProduct, orderSummery, deleteOrder };
