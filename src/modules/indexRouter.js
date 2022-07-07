const router = require('express').Router()

const resumeRouter = require('./Resume/router')

router.use('/user/resume',resumeRouter)

module.exports = router;