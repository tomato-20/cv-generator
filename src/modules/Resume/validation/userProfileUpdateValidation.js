const Joi = require('joi');

const userProfileUpdateValidationSchema = Joi.object({
    fullname : Joi.string(),
    summary: Joi.string().$.max(1000),
    role: Joi.string().$.max(90).rule({ message: "role must be at most 90 characters" }),
    website: Joi.string().uri().allow(''),
    address: Joi.string(),
    phone: Joi.string().$.pattern(new RegExp('^(9)[0-9]{9}$')).message({ "string.pattern.base": "Invalid Phone Number" })
})

const validateUserProfileUpdate = (data) => userProfileUpdateValidationSchema.validate(data)

module.exports = [validateUserProfileUpdate, userProfileUpdateValidationSchema]