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
              _id : uuidv4(),
             userId,
             resumeId,
             profile: profile.profile,
             url: profile.url,
             created : new Date(),
             createdBy : meta?.created?.id || userId,
             updatedAt: null,
          }
      })
    } catch (error) {
      throw error
    }
  }


const prepareEducationInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                resumeId,
                institution: element?.institution,
                course : element?.course,
                startDate : element?.startDate,
                endDate : element?.endDate,
                created: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}

const prepareCertificationsInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                resumeId,
                institution: element?.institution,
                course : element?.course,
                startDate : element?.startDate,
                endDate : element?.endDate,
                created: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}

const prepareExperiencesInsertData = (data, userId, resumeId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                resumeId,
                organization: element?.organization,
                position : element?.position,
                location : element?.position,
                summary: element?.summary,
                description: element?.description,
                startDate : element?.startDate,
                endDate : element?.endDate,
                created: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
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
               programmingSkills : data?.programmingSkills,
               tools : data?.tools,
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
    prepareEducationInsertData,
    prepareExperiencesInsertData,
    prepareCertificationsInsertData,
    prepareSkillInsertData,
    prepareUserProfilesInsertData
}