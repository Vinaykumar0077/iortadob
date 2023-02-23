const authSchema = require("../Model/auth");

const updateUserController = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = await authSchema.updateOne({ _id: req.user._id }, userDetails);
    if (user) {
      res
        .status(200)
        .json({ message: "user updated successfully", user: userDetails });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserController };
