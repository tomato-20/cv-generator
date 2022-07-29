const Joi = require('joi');

const editSkillsSchema = Joi.object().keys({
    industryKnowledge : Joi.array().items(Joi.string()),
    programmingSkills : Joi.array().items(Joi.string()),
    tools : Joi.array().items(Joi.string()), 
}).required().$.min(1).rule({
    message: 'any one of /industryKnowledge/, /programmingSkills/, /tools/ field is required',
})

const validateEditSkills = (data) => editSkillsSchema.validate(data)

module.exports = {
    validateSkillsUpdate : validateEditSkills
}