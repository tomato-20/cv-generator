const Joi = require('joi').extend(require('@joi/date'));

const editCertificationSchema = Joi.object({
    institution: Joi.string().label('institution'),
    course: Joi.string().label('course'),
    startDate : Joi.date().format('YYYY-MM-DD').required().label('startDate must be of format YYYY-MM-DD'),
    endDate : Joi.date().format('YYYY-MM-DD').required().label('endDate must be of format YYYY-MM-DD'),
})

const addCertificationSchema = Joi.object({
    resumeId : Joi.string().required().uuid(),
    institution: Joi.string().required().label('institution'),
    course: Joi.string().required().label('course'),
    startDate : Joi.date().format('YYYY-MM-DD').required().label('startDate must be of format YYYY-MM-DD'),
    endDate : Joi.date().format('YYYY-MM-DD').required().label('endDate must be of format YYYY-MM-DD'),
})

const validateCertificationSchema = (data) => editCertificationSchema.validate(data)
const validateAddCertificationSchema = (data) => addCertificationSchema.validate(data)

module.exports = {
    validateCertificationUpdate : validateCertificationSchema,
    validateAddCertification : validateAddCertificationSchema
}