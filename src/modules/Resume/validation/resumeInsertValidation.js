const Joi = require('joi').extend(require('@joi/date'));

const insertResumeSchema = Joi.object({
    summary: Joi.string().required().$.max(1000),
    role: Joi.string().required().$.max(90).rule({message: "role must be at most 90 characters"}),
    website: Joi.string().uri().allow(''),
    social : Joi.array().items(Joi.object({
        profile: Joi.string().required(),
        url: Joi.string().uri().required()
    })),
    education: Joi.array().items(Joi.object({
        institution: Joi.string().required().label('education institution'),
        course: Joi.string().required().label('education course'),
        startDate : Joi.date().format('YYYY-MM-DD').required().label('education startDate must be of format YYYY-MM-DD'),
        endDate : Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).required().label('education endDate must be of format YYYY-MM-DD or be "present" string'),
        location : Joi.string().required().label('education location')
    })).min(1),
    work: Joi.array().items(Joi.object({
        organization: Joi.string().required().label('work organization'),
        position: Joi.string().required().label('work position'),
        location : Joi.string().label('work location'),
        summary : Joi.string().max(300).label('work summary'),
        description : Joi.array().items(Joi.string().max(300)).label('work description').max(8),
        startDate : Joi.date().format('YYYY-MM-DD').required().label('work startDate must be of format YYYY-MM-DD'),
        endDate :Joi.alternatives().try(Joi.string().valid('present'),Joi.date().format('YYYY-MM-DD')).required().label('work endDate must be of format YYYY-MM-DD or be "present" string'),
    })).min(1).max(5).required(),
    certification : Joi.array().items(Joi.object({
        institution: Joi.string().required().label('certification institution'),
        course: Joi.string().required().label('certification course'),
        startDate : Joi.date().format('YYYY-MM-DD').required().label('certification startDate must be of format YYYY-MM-DD'),
        endDate : Joi.date().format('YYYY-MM-DD').required().label('certification endDate must be of format YYYY-MM-DD'),
    })),
    industryKnowledge : Joi.array().items(Joi.string()).required().min(2),
    programmingSkills : Joi.array().items(Joi.string()).required().min(2),
    tools : Joi.array().items(Joi.string()).min(2),  
}).options({allowUnknown: true})

const validateResumeInsert = (data) => insertResumeSchema.validate(data)

module.exports = [validateResumeInsert, insertResumeSchema];