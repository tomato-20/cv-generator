const router = require('express').Router()

const resumeRouter = require('./Resume/router')

const authRouter = require("./Auth/router")

router.use('/user/resume',resumeRouter)

router.use("/auth", authRouter)

module.exports = router;