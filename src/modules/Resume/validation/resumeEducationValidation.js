const Joi = require('joi');

const editEducationSchema = Joi.object({
    institution: Joi.string().label('Education institution'),
    course: Joi.string().label('Education course'),
    startDate: Joi.date().label('Education start date'),
    endDate: Joi.alternatives().try(Joi.string().valid('present'), Joi.date()).label('Education end date'),
    location: Joi.string().label('Education location')
})

const validateEducationSchema = (data) => editEducationSchema.validate(data)

module.exports = {
    validateEducationUpdate: validateEducationSchema
}