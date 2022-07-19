const Joi = require('joi');

const editExperienceSchema = Joi.object({
    organization: Joi.string().label('Work iorganization'),
    position: Joi.string().label('Work position'),
    location : Joi.string().label('Work location'),
    summary : Joi.string().max(300).label('Work summary'),
    description : Joi.array().items(Joi.string().max(300)).label('Work description').max(8),
    startDate : Joi.date().label('Work start date'),
    endDate : Joi.date().label('Work end date'),
})

const validateEditExperience = (data) => editExperienceSchema.validate(data)

module.exports = [validateEditExperience, editExperienceSchema]