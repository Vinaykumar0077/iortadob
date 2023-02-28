const authSchema = require("../../Model/auth");
const ProductSchema = require("../../Model/product");

const orderProduct = async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await ProductSchema.find({ _id: productIds }).sort({
      price: 1,
    });
    const suggestionProducts = [];
    let totalValue = 0;
    const validProducts = products.filter((product) => {
      totalValue = +totalValue + +product.price;
      if (req.user.balance > totalValue) {
        suggestionProducts.push(product.name);
        return product;
      } else {
        totalValue = totalValue - product.price;
      }
    });
    if (validProducts.length) {
      if (validProducts.length == products.length) {
        const orderedProducts = await Promise.all(
          products.map(async (product) => {
            req.user.balance = req.user.balance - product.price;
            await authSchema.updateOne(
              { _id: req.user._id },
              { balance: req.user.balance, $push: { products: product._id } }
            );
            return product;
          })
        );
        res
          .status(200)
          .json({ message: "ordered products successfully", orderedProducts });
      } else {
        res.status(400).json({
          message: `you are balance is less to buy all the products`,
          suggestion: `we got you, you can still buy products ${suggestionProducts}`,
        });
      }
    } else {
      res.status(400).json({ message: "insufficient balance" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await ProductSchema.find({ _id: productIds }).sort({
      price: 1,
    });
    const removedProducts = await Promise.all(
      products.map(async (product) => {
        req.user.balance = +req.user.balance + +product.price;
        await authSchema.updateOne(
          { _id: req.user._id },
          { balance: req.user.balance, $pull: { products: product._id } }
        );
        return product;
      })
    );
    if (removedProducts.length) {
      res
        .status(200)
        .json({ message: "Order Cancelled Successfully", removedProducts });
    } else {
      res.status(400).json({ message: "error while cancelling order" });
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
    if (orderData.products.length) {
      res.status(200).json(orderData);
    } else {
      res.status(400).json({ message: "you don't have any order" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderProduct, orderSummery, deleteOrder };
