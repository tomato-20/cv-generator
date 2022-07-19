const router = require('express').Router();

const authRegister = require("./user.register");

const authLogin = require("./user.login");

const auth = require("../../middlewere/authMiddlewere");

const responseHelper = require("../../helpers/responseHelper");

router.post("/register", authRegister.createUser);

router.post("/login", authLogin.login );

router.post("/verifytoken", auth, (req,res,next) => {
     return responseHelper.successResponse(res, "token verified", {userId: req.user.id})
    });

module.exports = router;