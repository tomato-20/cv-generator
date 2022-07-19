const Joi = require('joi');

const editSkillsSchema = Joi.object({
    industryKnowledge : Joi.array().items(Joi.string()),
    programmingSkills : Joi.array().items(Joi.string()),
    tools : Joi.array().items(Joi.string()), 
})

const validateEditSkills = (data) => editSkillsSchema.validate(data)

module.exports = [validateEditSkills, editSkillsSchema]