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
router.put('/edit/profile', authMiddlewere, profileController.editProfile)
router.put('/edit/experience/:id', authMiddlewere, experienceController.editExperience)
router.put('/edit/education/:id', authMiddlewere, educationController.editEducation)
router.put('/edit/certification/:id', authMiddlewere, certificationController.editCertification)
router.put('/edit/skills', authMiddlewere, skillsController.editSkills)

// add routes
router.post('/add/certification',authMiddlewere,certificationController.addCertification)
router.post('/add/education',authMiddlewere,educationController.addEducation)
router.post('/add/experience',authMiddlewere,experienceController.addExperience)

// delete routes
router.delete('/delete/certification/:id',authMiddlewere,certificationController.deleteCertification);
router.delete('/delete/education/:id',authMiddlewere,educationController.deleteEducation)
router.delete('/delete/experience/:id',authMiddlewere,experienceController.deleteExperience)

// get routes
router.get('/getPdf', authMiddlewere, getPdfController)

module.exports = router;