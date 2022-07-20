const Joi = require('joi');

const editEducationSchema = Joi.object({
    institution: Joi.string().label('institution'),
    course: Joi.string().label('course'),
    startDate: Joi.date().label('startDate'),
    endDate: Joi.alternatives().try(Joi.string().valid('present'), Joi.date()).label('endDate'),
    location: Joi.string().label('location')
})

const addEducationSchema = Joi.object({
    resumeId : Joi.string().uuid().required(),
    institution: Joi.string().required().label('institution'),
    course: Joi.string().required().label('course'),
    startDate: Joi.date().required().label('startDate').required(),
    endDate: Joi.alternatives().try(Joi.string().valid('present'), Joi.date()).label('endDate').required(),
    location: Joi.string().label('location').required(),
})

const validateEducationSchema = (data) => editEducationSchema.validate(data)
const validateAddEducationSchema = (data) => addEducationSchema.validate(data)

module.exports = {
    validateEducationUpdate: validateEducationSchema,
    validateAddEducation :  validateAddEducationSchema
}