const router = require('express').Router();

const getPdfController = require('./controllers/getPdf')
const insertResumeController = require('./controllers/insert')

const profileController = require('./controllers/profile');
const experienceController = require('./controllers/experiences');
const educationController = require('./controllers/education');
const certificationController = require('./controllers/certifications');
const skillsController = require('./controllers/skills')

const authMiddlewere = require('../../middlewere/authMiddlewere');

router.post('/', authMiddlewere, insertResumeController)

// edit routes
router.post('/edit/profile', authMiddlewere, profileController.editProfile)
router.post('/edit/experience/:id', authMiddlewere, experienceController.editExperience)
router.post('/edit/education/:id', authMiddlewere, educationController.editEducation)
router.post('/edit/certification/:id', authMiddlewere, certificationController.editCertification)
router.post('/edit/skills', authMiddlewere, skillsController.editSkills)

// add routes


// delete routes


// get routes
router.get('/getPdf', authMiddlewere, getPdfController)

module.exports = router;