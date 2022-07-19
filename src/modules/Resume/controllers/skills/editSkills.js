const resHelper = require('../../../../helpers/responseHelper')
const prepareUpdateData = require('../../helpers/prepareProfileUpdate')
const {validateSkillsUpdate} = require('../../validation/resumeSkillsValidation')

const editSkills = async (req, res, next) => {
    const userId = req.user.id;

    const skills = req.db.collection('skills');

    try {

        let validationResult = validateSkillsUpdate(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existSkills = await skills.findOne({ userId })

        if (!!Object.keys(req.body).length) {
            const updateExperienceResult = await skills.updateOne({ userId }, { $set: prepareUpdateData(req.body) })
        }
        
        resHelper.successResponse(res, 'Edit skills successfull!', { id: existSkills._id })
    } catch (error) {
        next(error)
    }
}


module.exports = editSkills