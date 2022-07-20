const Joi = require('joi');

const editCertificationSchema = Joi.object({
    institution: Joi.string().label('institution'),
    course: Joi.string().label('course'),
    startDate : Joi.date().label('startDate'),
    endDate : Joi.date().label('endDate'),
})

const addCertificationSchema = Joi.object({
    resumeId : Joi.string().required().uuid(),
    institution: Joi.string().required().label('institution'),
    course: Joi.string().required().label('course'),
    startDate : Joi.date().required().label('startDate'),
    endDate : Joi.date().required().label('endDate'),
})

const validateCertificationSchema = (data) => editCertificationSchema.validate(data)
const validateAddCertificationSchema = (data) => addCertificationSchema.validate(data)

module.exports = {
    validateCertificationUpdate : validateCertificationSchema,
    validateAddCertification : validateAddCertificationSchema
}