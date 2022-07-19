const resHelper = require('../../../../helpers/responseHelper')
const prepareUpdateData = require('../../helpers/prepareProfileUpdate')
const [validateEditExperience] = require('../../validation/editExperienceValidation')

const editSingleExperience = async (req,res,next) => {
    const userId = req.user.id;
    const experienceId = req.params.id;

    const Experiences = req.db.collection('experiences');

    try {

        let validationResult = validateEditExperience(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existExperience = await Experiences.findOne({_id : experienceId, userId})
        if(!existExperience) return resHelper.errorResponse(res,`Cannot find experience with id ${experienceId}`)

        if(!!Object.keys(req.body).length){
            const updateExperienceResult = await Experiences.updateOne({_id : experienceId, userId}, {$set : prepareUpdateData(req.body)})
        }
        resHelper.successResponse(res,'Edit experience successfull!', {id : existExperience._id})
    } catch (error) {
        next(error)
    }
} 

module.exports = editSingleExperience;
