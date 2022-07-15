const resHelper = require('../../../helpers/responseHelper');
const [validateResumeInsert] = require('../validation/resumeInsertValidation')
const {
    prepareBasicInfoData,
    prepareEducationInsertData,
    prepareCertificationsInsertData,
    prepareExperiencesInsertData,
    prepareSkillInsertData,
    prepareUserProfilesInsertData
} = require('../helpers/prepareResumeInsertData.db.helper')

const insertResume = async (req, res, next) => {
    const Users = req.db.collection('users');
    const Experiences = req.db.collection('experiences');
    const Education = req.db.collection('education');
    const Profiles = req.db.collection('profiles');
    const Certifications = req.db.collection('certifications')
    const Skills = req.db.collection('skills');
    const User_Resume = req.db.collection('user_resume')
    const { userId, ...resumeInsertData } = req.body;
    let promises = []


    try {
        const validationResult = validateResumeInsert(req.body)
        if (validationResult.error) {
            return resHelper.errorResponse(res, validationResult.error.details[0].message)
        }

        let existUser = await Users?.findOne({ _id: userId });
        if (!existUser) return resHelper.errorResponse(res, 'User Doesnot Exist!', 400)

        let selectedTemplate = await 

        // insert basic info into database
        let basicInfoData = { role: resumeInsertData.role, summary: resumeInsertData.summary, website: resumeInsertData.website }
        // let basicInfoDbInsertResult = await Users.updateOne({_id:userId},{$set : {...prepareBasicInfoData(basicInfoData,userId)}})
        promises.push(Users.updateOne({ _id: userId }, { $set: { ...prepareBasicInfoData(basicInfoData, userId) } }))

        // insert profiles 
        let profilesData = resumeInsertData.social;
        if (!!profilesData?.length) {
            // let profileInsertResult = await Profiles.insertMany(prepareUserProfilesInsertData(profilesData));
            promises.push(Profiles.insertMany(prepareUserProfilesInsertData(profilesData, userId)))
        }

        // insert education
        let educationData = resumeInsertData.education;
        if (!!educationData?.length) {
            // let educationInsetResult = await Education.insertMany(prepareEducationInsertData(educationData));
            promises.push(Education.insertMany(prepareEducationInsertData(educationData, userId)));
        }

        // insert experiences
        let experienceData = resumeInsertData.work;
        if (!!experienceData?.length) {
            promises.push(Experiences.insertMany(prepareExperiencesInsertData(experienceData, userId)))
        }

        // insert certification
        let certificationData = resumeInsertData.certification;
        if (!!certificationData?.length) {
            promises.push(Certifications.insertMany(prepareCertificationsInsertData(certificationData, userId)))
        }

        // insert skills
        let skillsData = { industryKnowledge: resumeInsertData.industryKnowledge, programmingSkills: resumeInsertData.programmingSkills, tools: resumeInsertData.tools }
        promises.push(Skills.insertOne(prepareSkillInsertData(skillsData, userId)))

        Promise.all(
            [
                ...promises
            ]
        )
            .then(result => console.log(result))
            .catch(error => console.log(error))

        return resHelper.successResponse(res, 'POST resume')
    } catch (error) {
        next(error)
    }

}

module.exports = insertResume;