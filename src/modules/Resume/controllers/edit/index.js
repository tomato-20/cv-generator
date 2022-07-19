const editSingleExperience = require("./editExperience");
const editProfile = require("./editProfile");
const editSingleEducation = require('./editEducation');
const editSingleCertification = require("./editCertification");
const editSkills = require("./editSkills");

module.exports = {
    editProfileController : editProfile,
    editSingleExperienceController : editSingleExperience,
    editSingleEducationController: editSingleEducation,
    editSingleCertificationController: editSingleCertification,
    editSkillsController: editSkills
}