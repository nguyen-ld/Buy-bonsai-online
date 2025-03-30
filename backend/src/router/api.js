const express = require("express");
const router = express.Router();

//api account
const { createAccount, login } = require("../controllers/CustomerControlles");

//call api account
router.post("/create-account", createAccount);
router.post("/login", login);

module.exports = router;
