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
        institution: Joi.string().required().label('Education institution'),
        course: Joi.string().required().label('Education course'),
        startDate : Joi.date().required().label('Education start date'),
        endDate : Joi.alternatives().try(Joi.string().valid('present'),Joi.date()).required().label('Education end date'),
        location : Joi.string().required().label('Education location')
    })).$.max(2).min(1).rule({message: "education can have only one or two entries"}),
    work: Joi.array().items(Joi.object({
        organization: Joi.string().required().label('Work iorganization'),
        position: Joi.string().required().label('Work position'),
        location : Joi.string().label('Work location'),
        summary : Joi.string().max(300).label('Work summary'),
        description : Joi.array().items(Joi.string().max(300)).label('Work description').max(8),
        startDate : Joi.date().required().label('Work start date'),
        endDate : Joi.date().required().label('Work end date'),
    })).max(5).required(),
    certification : Joi.array().items(Joi.object({
        institution: Joi.string().required().label('Certification institution'),
        course: Joi.string().required().label('Certification course'),
        startDate : Joi.date().required().label('Certification start date'),
        endDate : Joi.date().required().label('Certification end date'),
    })),
    industryKnowledge : Joi.array().items(Joi.string()).required().min(2),
    programmingSkills : Joi.array().items(Joi.string()).required().min(2),
    tools : Joi.array().items(Joi.string()).required().min(2),  
}).options({allowUnknown: true})

const validateResumeInsert = (data) => insertResumeSchema.validate(data)

module.exports = [validateResumeInsert, insertResumeSchema];