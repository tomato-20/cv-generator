const Joi = require('joi').extend(require('@joi/date'));

const editEducationSchema = Joi.object({
    institution: Joi.string().label('institution'),
    course: Joi.string().label('course'),
    startDate : Joi.date().format('YYYY-MM-DD').required().label('startDate must be of format YYYY-MM-DD'),
        endDate : Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).required().label('endDate must be of format YYYY-MM-DD or be "present" string'),
    location: Joi.string().label('location')
})

const addEducationSchema = Joi.object({
    resumeId : Joi.string().uuid().required(),
    institution: Joi.string().required().label('institution'),
    course: Joi.string().required().label('course'),
    startDate : Joi.date().format('YYYY-MM-DD').required().label('startDate must be of format YYYY-MM-DD'),
    endDate : Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).required().label('endDate must be of format YYYY-MM-DD or be "present" string'),
    location: Joi.string().label('location').required(),
})

const validateEducationSchema = (data) => editEducationSchema.validate(data)
const validateAddEducationSchema = (data) => addEducationSchema.validate(data)

module.exports = {
    validateEducationUpdate: validateEducationSchema,
    validateAddEducation :  validateAddEducationSchema
}