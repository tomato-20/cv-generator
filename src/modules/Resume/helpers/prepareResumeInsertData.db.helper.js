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

const prepareUserProfilesInsertData = (data, userId, meta) => {
    try {
      return data.map(profile => {
          return {
              _id : uuidv4(),
             userId,
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


const prepareEducationInsertData = (data, userId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                institution: element?.institution,
                course : element?.course,
                startDate : element?.startDate,
                endDate : element?.endDate,
                createdAt: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}

const prepareCertificationsInsertData = (data, userId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                institution: element?.institution,
                course : element?.course,
                startDate : element?.startDate,
                endDate : element?.endDate,
                createdAt: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}

const prepareExperiencesInsertData = (data, userId) => {
    try {
        return data.map(element => {
            return {
                _id: uuidv4(),
                userId,
                organization: element?.organization,
                position : element?.position,
                location : element?.position,
                summary: element?.summary,
                description: element?.description,
                startDate : element?.startDate,
                endDate : element?.endDate,
                createdAt: new Date(),
                createdBy: userId,
                updatedAt: null,
            }
        })
    } catch (error) {
        throw error
    }
}


const prepareSkillInsertData = (data, userId) => {
    try {
         return {
                _id: uuidv4(),
                userId,
               industryKnowledge: data?.industryKnowledge,
               programmingSkills : data?.programmingSkills,
               tools : data?.tools,
                createdAt: new Date(),
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