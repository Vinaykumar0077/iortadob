const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    price: {
      type: String,
    },
    // users: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "auth",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = model("products", ProductSchema);
