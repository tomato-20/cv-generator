const resHelper = require('../../../../helpers/responseHelper')
const {validateUserProfileUpdate} = require('../../validation/resumeProfileValidations')
const prepareUpdateData = require('../../helpers/prepareDbUpdateData')

const editProfile = async (req,res,next) => {
    const userId = req.user.id;

    const Users = req.db.collection('users');

    try {

        let validationResult = validateUserProfileUpdate(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        let currentUserData = await Users.findOne({_id: userId});
        if(!currentUserData) return resHelper.errorResponse(res,'Couldnot find user! Please try again!')

        let updateProfileDataResult = await Users.updateOne({_id: userId}, {$set : prepareUpdateData(req.body, userId)})

        resHelper.successResponse(res,'Edit Successfull')
    } catch (error) {
        next(error)
    }
}

module.exports = editProfile