const express = require("express");
const { PORT, DATABASE_URL } = require("./config");
const { connectDataBase } = require("./config/dataBase");

const authRoutes = require("./router/auth");
const productsRoutes = require("./router/products");
const ordersRoutes = require("./router/order");

let app = express();

const startServer = () => {
  try {
    connectDataBase(DATABASE_URL);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/auth", authRoutes);
    app.use("/api/products", productsRoutes);
    app.use("/api/order", ordersRoutes);

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is running on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();
