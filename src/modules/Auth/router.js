const router = require('express').Router();

const authRegister = require("./user.register");

const authLogin = require("./user.login")

router.use("/register", authRegister.createUser);

router.use("/login", authLogin.login )

module.exports = router;