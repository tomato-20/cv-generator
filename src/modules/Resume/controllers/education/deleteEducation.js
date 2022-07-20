const resHelper = require('../../../../helpers/responseHelper');

const deleteEducation = async (req,res,next) => {
    const userId = req.user.id;
    const educationId = req.params.id;
    const Education = req.db.collection('education')
    try {
        const deleteResult = await Education.deleteOne({_id: educationId, userId})
       if(!!deleteResult.deletedCount) return resHelper.successResponse(res,`Deleted edcation with id ${educationId}`)
       return resHelper.errorResponse(res,`Cannot delete edcation with id ${educationId}`)
    } catch (error) {
        next(error)
    }
}

module.exports = deleteEducation