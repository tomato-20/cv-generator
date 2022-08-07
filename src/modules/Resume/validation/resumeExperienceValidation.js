const Joi = require('joi').extend(require('@joi/date'));

const editExperienceSchema = Joi.object({
    organization: Joi.string(),
    position: Joi.string(),
    location : Joi.string(),
    summary : Joi.string().max(300),
    description : Joi.array().items(Joi.string().max(300)).max(8),
    startDate : Joi.date().format('YYYY-MM-DD').label('startDate must be of format YYYY-MM-DD'),
    endDate :Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).label('endDate must be of format YYYY-MM-DD or be "present" string'),
})
const addExperienceSchema = Joi.object({
    resumeId: Joi.string().uuid().required(),
    organization: Joi.string().required(),
    position: Joi.string().required(),
    location : Joi.string().required(),
    summary : Joi.string().max(300).required(),
    description : Joi.array().items(Joi.string().max(300)).max(8),
    startDate : Joi.date().format('YYYY-MM-DD').required().label('startDate must be of format YYYY-MM-DD'),
    endDate :Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).required().label('endDate must be of format YYYY-MM-DD or be "present" string'),
})

const validateEditExperience = (data) => editExperienceSchema.validate(data)
const validateAddExperience = (data) => addExperienceSchema.validate(data)

module.exports = {
   validateExperienceUpdate : validateEditExperience,
   validateAddExperience  
}