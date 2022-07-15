const resHelper = require('../../../helpers/responseHelper')

const path = require('path');
const pdf = require('html-pdf')
const fs = require('fs')

// remove the unrequired fields from the queried data 
const getFilteredObject = (object) => {
    if (!Object.keys(object).length) return object
    let { createdAt, createdBy, deletedBy, deletedAt, updatedAt, updatedBy, ...filteredData } = object;
    return filteredData;
}

const getPdf = async (req, res, next) => {
    const userId = req.user.id;

    const Users = req.db.collection('users');
    const Profiles = req.db.collection('profiles');
    const Education = req.db.collection('education');
    const Experiences = req.db.collection('experiences');
    const Skills = req.db.collection('skills');
    const Certifications = req.db.collection('certifications');

    try {

        /* Promise.allSettled([
            Users.findOne({_id: userId}),
            Profiles.find({userId}),
            Experiences.find({userId}),
            Education.find({userId}),
            Skills.findOne({userId}),
            Certifications.find({userId}),

        ])
            .then(result => { 
                console.log(result);
                
                let displayData = {};
                let temp = []; 
                
                displayData = {...getFilteredObject(result[0].value)};

                

                console.log(displayData)

                

            })
            .catch(error => {console.log(error)})
 */


        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../demoData/create-resume.json')));
        data.fullname = "Jane Doe";
        data.email = "janedoe@gmail.com"
        return res.render('TemplateOne/index.ejs', { data })
       /*  return res.render('TemplateOne/index.ejs', { data }, function (err, html) {
            if (err) res.json({ error: err })
            pdf.create(html, {
                format: "A4", 
                // border: {
                //     bottom: "-2in"
                // }
            }).toBuffer(function (err, buffer) {
                if (err) console.log(err)
                // fs.writeFileSync('template.pdf',buffer);
                res.header('content-type', 'application/pdf');
                res.send(buffer)
            })
        }) */
        // resHelper.successResponse(res, 'Getting pdf')
    } catch (error) {
        next(error)
    }
}

module.exports = getPdf