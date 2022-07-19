const resHelper = require('../../../../helpers/responseHelper')
const prepareUpdateData = require('../../helpers/prepareDbUpdateData')
const {validateCertificationUpdate} = require('../../validation/resumeCertificationValidation')

const editSingleCertification  = async (req,res,next) => {
    const userId = req.user.id;
    const certificationId = req.params.id;

    const Certification = req.db.collection('certifications');

    try {

        let validationResult = validateCertificationUpdate(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        const existCertification = await Certification.findOne({_id : certificationId, userId})
        if(!existCertification) return resHelper.errorResponse(res,`Cannot find Certification with id ${certificationId}`)

        if(!!Object.keys(req.body).length){
            const updateCertificationResult = await Certification.updateOne({_id : certificationId, userId}, {$set : prepareUpdateData(req.body)})
        }
        resHelper.successResponse(res,'Edit Certification successfull!', {id: existCertification._id})
    } catch (error) {
        next(error)
    }
} 

module.exports = editSingleCertification ;
