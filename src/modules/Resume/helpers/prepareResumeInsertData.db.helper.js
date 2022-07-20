const { v4: uuidv4 } = require('uuid')

const prepareBasicInfoData = (data, userId) => {
    try {
        return {
            role: data?.role,
            website: data?.website,
            summary: data?.summary,
            updatedAt: new Date(),
            updatedBy: userId,
        }
    } catch (error) {
        throw error
    }
}

const prepareUserProfilesInsertData = (data, userId, resumeId, meta) => {
    try {
        return data.map(profile => {
            return {
                _id: uuidv4(),
                userId,
                resumeId,
                profile: profile.profile,
                url: profile.url,
                created: new Date(),
                createdBy: meta?.created?.id || userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}

// education
const prepareSingleEducationInsertData = (item,userId,resumeId) => {
    try {
        return {
            _id: uuidv4(),
            userId,
            resumeId,
            institution: item?.institution,
            course: item?.course,
            startDate: item?.startDate,
            endDate: item?.endDate,
            created: new Date(),
            createdBy: userId,
            updatedAt: null,
        }
    } catch (error) {
        throw error
    }
}

const prepareEducationInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return prepareSingleEducationInsertData(element,userId,resumeId)
        })
    } catch (error) {
        throw error
    }
}


// certification 
const prepareCertificationInsertData = (item, userId, resumeId) => {
    try {
        return {
            _id: uuidv4(),
            userId,
            resumeId,
            institution: item?.institution,
            course: item?.course,
            startDate: item?.startDate,
            endDate: item?.endDate,
            created: new Date(),
            createdBy: userId,
            updatedAt: null,
        }
    } catch (error) {
        throw error
    }
}

const prepareCertificationsInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return prepareCertificationInsertData(element, userId, resumeId)
        })
    } catch (error) {
        throw error
    }
}

// experience

const prepareExperienceInsertData = (item,userId,resumeId) => {
    try {
        return {
            _id: uuidv4(),
            userId,
            resumeId,
            organization: item?.organization,
            position: item?.position,
            location: item?.location,
            summary: item?.summary,
            description: item?.description,
            startDate: item?.startDate,
            endDate: item?.endDate,
            created: new Date(),
            createdBy: userId,
            updatedAt: null,
        }
    } catch (error) {
        throw error
    }
}


const prepareExperiencesInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return prepareExperienceInsertData(element,userId,resumeId)
        })
    } catch (error) {
        throw error
    }
}


const prepareSkillInsertData = (data, userId, resumeId) => {
    try {
        return {
            _id: uuidv4(),
            userId,
            resumeId,
            industryKnowledge: data?.industryKnowledge,
            programmingSkills: data?.programmingSkills,
            tools: data?.tools,
            created: new Date(),
            createdBy: userId,
            updatedAt: null,
        }

    } catch (error) {
        throw error
    }
}


module.exports = {
    prepareBasicInfoData,
    prepareSingleEducationInsertData,
    prepareEducationInsertData,
    prepareExperienceInsertData,
    prepareExperiencesInsertData,
    prepareCertificationInsertData,
    prepareCertificationsInsertData,
    prepareSkillInsertData,
    prepareUserProfilesInsertData
}