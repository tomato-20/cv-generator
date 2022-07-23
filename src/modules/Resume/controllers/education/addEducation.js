const resHelper = require('../../../../helpers/responseHelper');
const { validateAddEducation } = require('../../validation/resumeEducationValidation');
const {prepareSingleEducationInsertData} = require('../../helpers/prepareResumeInsertData.db.helper')

const addEducation = async (req, res, next) => {
    const userId = req.user.id;
    const resumeId = req.body.resumeId

    const Education = req.db.collection('education');
    const User_resume = req.db.collection('user_resume')

    try {

        const validationResult = validateAddEducation(req.body);
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existUserResume = await User_resume.findOne({userId ,resumeId });
        if (!existUserResume) return resHelper.errorResponse(res, `Cound not find resume with ${resumeId} for user with id ${userId}`);

        const insertDbResult = await Education.insertOne({...prepareSingleEducationInsertData(req.body,userId,resumeId)})

        return resHelper.successResponse(res,'Certification insert successfull', {id : insertDbResult.insertedId})

    } catch (error) {
        next(error)
    }
}

module.exports = addEducation