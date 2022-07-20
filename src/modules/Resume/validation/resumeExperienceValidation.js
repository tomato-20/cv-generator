const Joi = require('joi');

const editExperienceSchema = Joi.object({
    organization: Joi.string(),
    position: Joi.string(),
    location : Joi.string(),
    summary : Joi.string().max(300),
    description : Joi.array().items(Joi.string().max(300)).max(8),
    startDate : Joi.date(),
    endDate : Joi.date(),
})
const addExperienceSchema = Joi.object({
    resumeId: Joi.string().uuid().required(),
    organization: Joi.string().required(),
    position: Joi.string().required(),
    location : Joi.string().required(),
    summary : Joi.string().max(300).required(),
    description : Joi.array().items(Joi.string().max(300)).max(8),
    startDate : Joi.date().required(),
    endDate: Joi.alternatives().try(Joi.string().valid('present'), Joi.date()).label('endDate'),
})

const validateEditExperience = (data) => editExperienceSchema.validate(data)
const validateAddExperience = (data) => addExperienceSchema.validate(data)

module.exports = {
   validateExperienceUpdate : validateEditExperience,
   validateAddExperience  
}