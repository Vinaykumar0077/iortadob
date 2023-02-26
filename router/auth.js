const express = require("express");
const router = express.Router();

const { authenticate } = require("../utility/authprotect");

const { registerController } = require("../controller/auth/register");
const { loginController } = require("../controller/auth/login");
const { approvalController } = require("../controller/auth/approval");
const { getAllUserController } = require("../controller/auth/getUsers");
const { updateUserController } = require("../controller/auth/updateUser");
const { logoutController } = require("../controller/auth/logout");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);
router.get("/users", authenticate, getAllUserController);
router.put("/approve", authenticate, approvalController);
router.put("/update", authenticate, updateUserController);

module.exports = router;
