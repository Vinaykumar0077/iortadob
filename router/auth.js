const express = require("express");
const router = express.Router();

const { authenticate } = require("../utility/authprotect");

const { registerController } = require("../controller/register");
const { loginController } = require("../controller/login");
const { approvalController } = require("../controller/approval");
const { getAllUserController } = require("../controller/getUsers");
const { updateUserController } = require("../controller/updateUser");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users", authenticate, getAllUserController);
router.put("/approve", authenticate, approvalController);
router.put("/update", authenticate, updateUserController);

module.exports = router;
