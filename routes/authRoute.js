const express = require("express");
const router = express.Router();

// controller
const { signUpController } = require("../controllers/signUp");
const { loginController } = require("../controllers/login");

// ########################################################
//                          Routers
// ########################################################

// router mapping with controller
router.post("/sign-up", signUpController)
router.post("/login", loginController)

module.exports = router;