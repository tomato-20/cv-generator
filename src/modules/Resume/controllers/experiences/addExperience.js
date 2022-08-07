const resHelper = require('../../../../helpers/responseHelper');
const { validateAddExperience } = require('../../validation/resumeExperienceValidation');
const {prepareExperienceInsertData} = require('../../helpers/prepareResumeInsertData.db.helper')

const addExperience = async (req, res, next) => {
    const userId = req.user.id;
    const resumeId = req.body.resumeId

    const Experiences = req.db.collection('experiences');
    const User_resume = req.db.collection('user_resume')

    try {

        const validationResult = validateAddExperience(req.body);
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existUserResume = await User_resume.findOne({userId ,resumeId });
        if (!existUserResume) return resHelper.errorResponse(res, `Cound not find resume with ${resumeId} for user with id ${userId}`);

        const insertDbResult = await Experiences.insertOne({...prepareExperienceInsertData(req.body,userId,resumeId)})

        return resHelper.successResponse(res,'Experience insert successfull', {id: insertDbResult.insertedId}, 201)

    } catch (error) {
        next(error)
    }
}

module.exports = addExperience