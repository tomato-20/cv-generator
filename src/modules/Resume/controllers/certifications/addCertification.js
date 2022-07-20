const resHelper = require('../../../../helpers/responseHelper');
const { validateAddCertification } = require('../../validation/resumeCertificationValidation');
const {prepareCertificationInsertData} = require('../../helpers/prepareResumeInsertData.db.helper')

const addCertification = async (req, res, next) => {
    const userId = req.user.id;
    const resumeId = req.body.resumeId

    const Certifications = req.db.collection('certifications');
    const User_resume = req.db.collection('user_resume')

    try {

        const validationResult = validateAddCertification(req.body);
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existUserResume = await User_resume.findOne({userId ,resumeId });
        if (!existUserResume) return resHelper.errorResponse(res, `Cound not find resume with ${resumeId} for user with id ${userId}`);

        const insertDbResult = await Certifications.insertOne({...prepareCertificationInsertData(req.body,userId,resumeId)})

        return resHelper.successResponse(res,'Certification insert successfull', insertDbResult.insertedId)

    } catch (error) {
        next(error)
    }
}

module.exports = addCertification