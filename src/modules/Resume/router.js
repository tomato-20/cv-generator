const router = require('express').Router();

const getPdfController = require('./controllers/getPdf')
const insertResumeController = require('./controllers/insert')
const {
    editProfileController,
    editSingleExperienceController,
    editSingleEducationController,
    editSingleCertificationController,
    editSkillsController
} = require('./controllers/edit')
const authMiddlewere = require('../../middlewere/authMiddlewere');

router.post('/', authMiddlewere, insertResumeController)

router.post('/edit/profile', authMiddlewere, editProfileController)
router.post('/edit/experience/:id', authMiddlewere, editSingleExperienceController)
router.post('/edit/education/:id', authMiddlewere, editSingleEducationController)
router.post('/edit/certification/:id', authMiddlewere, editSingleCertificationController)
router.post('/edit/skills', authMiddlewere, editSkillsController)

router.get('/getPdf', authMiddlewere, getPdfController)

module.exports = router;