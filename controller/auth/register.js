const authSchema = require("../../Model/auth");

const registerController = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = await authSchema.create(userDetails);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "error while creating user" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { registerController };
