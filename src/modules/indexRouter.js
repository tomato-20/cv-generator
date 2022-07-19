const router = require('express').Router()

const resumeRouter = require('./Resume/router');

const authRouter = require("./Auth/router");

const templateRouter = require("./Template/router");

router.use('/user/resume',resumeRouter)

router.use("/auth", authRouter)

router.use("/template", templateRouter)

module.exports = router;