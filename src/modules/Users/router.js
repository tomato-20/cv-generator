const router = require('express').Router();

const authMiddlewere = require('../../middlewere/authMiddlewere')
const getAllUserDataController = require('./controllers/getAllUserData')

router.get('/',authMiddlewere, getAllUserDataController)

module.exports = router;