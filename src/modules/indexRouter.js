const router = require('express').Router()

const resumeRouter = require('./Resume/router');

const authRouter = require("./Auth/router");

const templateRouter = require("./Template/router");

const userRouter = require('./Users/router')

router.use('/resume',resumeRouter)

router.use("/auth", authRouter)

router.use("/user",userRouter)

router.use("/template", templateRouter)

module.exports = router;