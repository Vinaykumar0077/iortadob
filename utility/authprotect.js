const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const authSchema = require("../Model/auth");

exports.authenticate = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({
        error: { message: "You are Not Authenticated" },
      });
    }
    try {
      let decoded = jwt.verify(token, JWT_SECRET);
      req.user = await authSchema.findById(decoded.id);
      next();
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res
      .status(401)
      .json({ message: "Sorry...! you don't have access, please login" });
  }
};

exports.authorize = (...allRoles) => {
  return (req, res, next) => {
    if (!allRoles.includes(req.user.role)) {
      res
        .status(401)
        .json({ errors: { message: `${req.user.role} is not authorized` } });
    }
  };
};
