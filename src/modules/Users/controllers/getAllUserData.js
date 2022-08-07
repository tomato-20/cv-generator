const resHelper = require('../../../helpers/responseHelper')

// remove the unrequired fields from the queried data 
const getFilteredObject = (object) => {
    if (!object || !Object.keys(object).length) return object
    let { _id, createdBy, deletedBy, deletedAt,userId,resumeId, updatedBy, ...filteredData } = object;
    filteredData.id = _id;
    if(filteredData.password) filteredData.password = undefined
    if(filteredData.startDate) filteredData.startDate = filteredData.startDate.toLocaleString('en-CA').split(',')[0];
    if(filteredData.endDate) {
        filteredData.endDate = filteredData.endDate == 'present' ? filteredData.endDate : filteredData.endDate.toLocaleString('en-CA').split(',')[0]
    }
    return filteredData;
}


const getAllUserData = async (req, res, next) => {
    const userId = req.user.id;

    const Users = req.db.collection('users');
    const Profiles = req.db.collection('profiles');
    const Education = req.db.collection('education');
    const Experiences = req.db.collection('experiences');
    const Skills = req.db.collection('skills');
    const Certifications = req.db.collection('certifications');
    const User_Resume = req.db.collection('user_resume')


    try {

        let user_resume = await User_Resume.findOne({userId})
        let resumeId = undefined;
        if(user_resume) {
            resumeId = user_resume.resumeId;
        } 

        Promise.allSettled([
            Users.findOne({ _id: userId }),
            Profiles.find({ userId }),
            Experiences.find({ userId }).sort({startDate : -1}),
            Education.find({ userId }).sort({startDate : -1}),
            Skills.findOne({ userId }),
            Certifications.find({ userId }),

        ])
            .then(async result => {
                // console.log(result);

                // fetch the user data to generate html 
                let displayData = {};

                displayData = {
                    ...getFilteredObject(result[0].value),
                    social: ([...await result[1].value.toArray()]).map(profile=> getFilteredObject({...profile})),
                    experiences: ([...await result[2].value.toArray()]).map(experience=> getFilteredObject({...experience})),
                    education: ([...await result[3].value.toArray()]).map(education=> getFilteredObject({...education})),
                    skills: getFilteredObject(result[4].value),
                    certifications: ([...await result[5].value.toArray()]).map(certification=> getFilteredObject({...certification})),
                    resumeId
                };

                // console.log(displayData)

                return resHelper.successResponse(res, 'User Data fetch success!', displayData)
            })
            .catch(error => {
                console.log(error)
                return resHelper.errorResponse(res, 'Cannot fetch user data. Try Again!')
            })
    } catch (error) {
        next(error)
    }
}

module.exports = getAllUserData;