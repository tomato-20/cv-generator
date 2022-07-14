const router = require('express').Router();

const insertResumeController = require('./insert')

router.use('/',insertResumeController)

module.exports = router;