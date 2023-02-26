const authSchema = require("../../Model/auth");

const getAllUserController = async (req, res) => {
  try {
    if (req.user.role == "admin") {
      const users = await authSchema.find();
      if (users.length) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({ message: "users not found" });
      }
    } else if (req.user.role == "approver") {
      const users = await authSchema.find({
        role: "user",
        isApproverApproved: false,
      });
      if (users.length) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({ message: "users not found" });
      }
    } else if (req.user.role == "supervisor") {
      const users = await authSchema.find({
        role: "user",
        isApproverApproved: true,
        isSupervisorApproved: false,
      });
      if (users.length) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({ message: "users not found" });
      }
    } else if (req.user.role == "user") {
      res.status(200).json(req.user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUserController };
