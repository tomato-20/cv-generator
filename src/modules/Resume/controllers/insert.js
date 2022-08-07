const { v4: uuid } = require('uuid')

const resHelper = require('../../../helpers/responseHelper');
const [validateResumeInsert] = require('../validation/resumeInsertValidation')
const {
    prepareBasicInfoData,
    prepareEducationInsertData,
    prepareCertificationsInsertData,
    prepareExperiencesInsertData,
    prepareSkillInsertData,
    prepareUserProfilesInsertData
} = require('../helpers/prepareResumeInsertData.db.helper');
const { StatusCodes } = require('http-status-codes');

const insertResume = async (req, res, next) => {
    const Users = req.db.collection('users');
    const Experiences = req.db.collection('experiences');
    const Education = req.db.collection('education');
    const Profiles = req.db.collection('profiles');
    const Certifications = req.db.collection('certifications')
    const Skills = req.db.collection('skills');
    const User_Resume = req.db.collection('user_resume')
    const resumeInsertData = req.body;
    const userId = req.user.id
    let promises = []


    try {
        const validationResult = validateResumeInsert(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        let existUser = await Users?.findOne({ _id: userId });
        if (!existUser) return resHelper.errorResponse(res, 'User Doesnot Exist!', 400)

        let user_resume = await User_Resume.findOne({ userId })

        // make update to user_resume mapping table if necessary
        let resumeId = uuid();

        if (!user_resume) {
            let insertUserResumeMap = await User_Resume.insertOne({ userId, resumeId });
            // TODO [opt] : check if insertSuccessfull 
        } else if (!user_resume.resumeId) {
            let updateUserResumeMap = await User_Resume.updateOne({ userId }, { $set: { resumeId } })
            // TODO [opt] : check if update successfull
        } else {
            return resHelper.errorResponse(res, 'User already have inserted data. please use edit')
        }

        // insert basic info into database
        let basicInfoData = { role: resumeInsertData.role, summary: resumeInsertData.summary, website: resumeInsertData.website }
        // let basicInfoDbInsertResult = await Users.updateOne({_id:userId},{$set : {...prepareBasicInfoData(basicInfoData,userId)}})
        promises.push(Users.updateOne({ _id: userId }, { $set: { ...prepareBasicInfoData(basicInfoData, userId) } }))

        // insert profiles 
        let profilesData = resumeInsertData.social;
        if (!!profilesData?.length) {
            // let profileInsertResult = await Profiles.insertMany(prepareUserProfilesInsertData(profilesData));
            promises.push(Profiles.insertMany(prepareUserProfilesInsertData(profilesData, userId, resumeId)))
        }

        // insert education
        let educationData = resumeInsertData.education;
        if (!!educationData?.length) {
            // let educationInsetResult = await Education.insertMany(prepareEducationInsertData(educationData));
            promises.push(Education.insertMany(prepareEducationInsertData(educationData, userId, resumeId)));
        }

        // insert experiences
        let experienceData = resumeInsertData.experience;
        if (!!experienceData?.length) {
            promises.push(Experiences.insertMany(prepareExperiencesInsertData(experienceData, userId, resumeId)))
        }

        // insert certification
        let certificationData = resumeInsertData.certification;
        if (!!certificationData?.length) {
            promises.push(Certifications.insertMany(prepareCertificationsInsertData(certificationData, userId, resumeId)))
        }

        // insert skills
        let skillsData = { industryKnowledge: resumeInsertData.industryKnowledge, programmingSkills: resumeInsertData.programmingSkills, tools: resumeInsertData.tools }
        promises.push(Skills.insertOne(prepareSkillInsertData(skillsData, userId, resumeId)))

        Promise.all(
            [
                ...promises
            ]
        )
            .then(result => console.log(result))
            .catch(error => {
                console.log(error);
                return resHelper.errorResponse(res, 'Cannot insert Data please try again')
            })

        return resHelper.successResponse(res, 'resume data inserted', '', StatusCodes.CREATED)
    } catch (error) {
        next(error)
    }

}

module.exports = insertResume;