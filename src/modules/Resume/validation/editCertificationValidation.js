const Joi = require('joi');

const editCertificationSchema = Joi.object({
    institution: Joi.string().label('Certification institution'),
    course: Joi.string().label('Certification course'),
    startDate : Joi.date().label('Certification start date'),
    endDate : Joi.date().label('Certification end date'),
})

const validateCertificationSchema = (data) => editCertificationSchema.validate(data)

module.exports = [validateCertificationSchema, editCertificationSchema]