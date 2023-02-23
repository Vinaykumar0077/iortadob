const { connect, set } = require("mongoose");

exports.connectDataBase = (url) => {
  set("strictQuery", true);
  connect(url);
  console.log("Database Connected Successfully");
};
