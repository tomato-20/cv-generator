const router = require('express').Router()

const resumeRouter = require('./Resume/router')

const authRouter = require("./Auth/router")

const userRouter = require('./Users/router')

router.use('/resume',resumeRouter)

router.use("/auth", authRouter)

router.use("/user",userRouter)

module.exports = router;