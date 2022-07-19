const resHelper = require('../../../../helpers/responseHelper')
const prepareUpdateData = require('../../helpers/prepareDbUpdateData')
const {validateEducationUpdate} = require('../../validation/resumeEducationValidation')

const editSingleEducation = async (req,res,next) => {
    const userId = req.user.id;
    const educationId = req.params.id;

    const Education = req.db.collection('education');

    try {

        let validationResult = validateEducationUpdate(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existEducation = await Education.findOne({_id : educationId, userId})
        if(!existEducation) return resHelper.errorResponse(res,`Cannot find Education with id ${educationId}`)

        if(!!Object.keys(req.body).length){
            const updateEducationResult = await Education.updateOne({_id : educationId, userId}, {$set : prepareUpdateData(req.body)})
        }
        resHelper.successResponse(res,'Edit Education successfull!', {id: existEducation._id})
    } catch (error) {
        next(error)
    }
} 

module.exports = editSingleEducation;
