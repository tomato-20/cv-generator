const Joi = require('joi');

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
        startDate : Joi.date().required().label('education startDate'),
        endDate : Joi.alternatives().try(Joi.string().valid('present'),Joi.date()).required().label('education endDate'),
        location : Joi.string().required().label('education location')
    })).min(1),
    work: Joi.array().items(Joi.object({
        organization: Joi.string().required().label('work organization'),
        position: Joi.string().required().label('work position'),
        location : Joi.string().label('work location'),
        summary : Joi.string().max(300).label('work summary'),
        description : Joi.array().items(Joi.string().max(300)).label('work description').max(8),
        startDate : Joi.date().required().label('work startDate'),
        endDate : Joi.date().required().label('work endDate'),
    })).min(1).max(5).required(),
    certification : Joi.array().items(Joi.object({
        institution: Joi.string().required().label('certification institution'),
        course: Joi.string().required().label('certification course'),
        startDate : Joi.date().required().label('certification startDate'),
        endDate : Joi.date().required().label('certification endDate'),
    })),
    industryKnowledge : Joi.array().items(Joi.string()).required().min(2),
    programmingSkills : Joi.array().items(Joi.string()).required().min(2),
    tools : Joi.array().items(Joi.string()).min(2),  
}).options({allowUnknown: true})

const validateResumeInsert = (data) => insertResumeSchema.validate(data)

module.exports = [validateResumeInsert, insertResumeSchema];