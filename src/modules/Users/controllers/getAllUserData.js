const resHelper = require('../../../helpers/responseHelper')

// remove the unrequired fields from the queried data 
const getFilteredObject = (object) => {
    if (!object || !Object.keys(object).length) return object
    let { _id, createdAt, createdBy, deletedBy, deletedAt, updatedAt, updatedBy, ...filteredData } = object;
    filteredData.id = _id;
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

    try {

        Promise.allSettled([
            Users.findOne({ _id: userId }),
            Profiles.find({ userId }),
            Experiences.find({ userId }),
            Education.find({ userId }),
            Skills.findOne({ userId }),
            Certifications.find({ userId }),

        ])
            .then(async result => {
                console.log(result);

                // fetch the user data to generate html 
                let displayData = {};

                displayData = {
                    ...getFilteredObject(result[0].value),
                    social: await result[1].value.toArray(),
                    experiences: (await result[2].value.toArray()),
                    education: (await result[3].value.toArray()),
                    skills: getFilteredObject(result[4].value),
                    certifications: await result[5].value.toArray(),
                };

                console.log(displayData)

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