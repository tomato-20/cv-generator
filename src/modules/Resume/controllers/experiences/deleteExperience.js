const resHelper = require('../../../../helpers/responseHelper');

const deleteExperience = async (req, res, next) => {
    const userId = req.user.id;
    const experienceId = req.params.id;
    const Experiences = req.db.collection('experiences'
    )

    try {
        const deleteResult = await Experiences.deleteOne({ _id: experienceId, userId })
        if (!!deleteResult.deletedCount) return resHelper.successResponse(res, `Deleted experience with id ${experienceId}`)
        return resHelper.errorResponse(res, `Cannot delete experience with id ${experienceId}`)

    } catch (error) {
        next(error)
    }
}

module.exports = deleteExperience