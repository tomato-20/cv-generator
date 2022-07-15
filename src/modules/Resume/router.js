const router = require('express').Router();

const insertResumeController = require('./controllers/insert')
const getPdfController = require('./controllers/getPdf')
const authMiddlewere = require('../../middlewere/authMiddlewere');

router.post('/',insertResumeController)

router.get('/getPdf', authMiddlewere, getPdfController)

module.exports = router;