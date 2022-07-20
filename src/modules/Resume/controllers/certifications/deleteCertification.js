const resHelper = require('../../../../helpers/responseHelper');

const deleteCertification = async (req,res,next) => {
    const userId = req.user.id;
    const certificationId = req.params.id;
    const Certifications = req.db.collection('certifications');

    try {
        const deleteResult = await Certifications.deleteOne({_id: certificationId, userId})
       if(!!deleteResult.deletedCount) return resHelper.successResponse(res,`Deleted certification with id ${certificationId}`)
       return resHelper.errorResponse(res,`Cannot delete certification with id ${certificationId}`)
    } catch (error) {
        next(error)
    }
}

module.exports = deleteCertification;