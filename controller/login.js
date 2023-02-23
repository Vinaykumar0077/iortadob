const authSchema = require("../Model/auth");
const { compare } = require("bcryptjs");
const { JWT_EXPIRES, JWT_SECRET } = require("../config/index");
const { sign } = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are mandatory" });
  } else {
    const user = await authSchema.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
    } else if (!user.isApproverApproved || !user.isSupervisorApproved) {
      res.status(401).json({ message: "your account yet to be approved" });
    } else {
      const matchPass = await compare(password, user.password);
      if (!matchPass) {
        res.status(400).json({ message: "password does not match" });
      } else {
        const token = sign({ id: user._id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES,
        });
        res
          .status(200)
          .json({ message: "user logged in successfully", users: user, token });
      }
    }
  }
};

module.exports = { loginController };
