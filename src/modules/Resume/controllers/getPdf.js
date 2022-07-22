const resHelper = require('../../../helpers/responseHelper')

const fs = require('fs'); 
const path = require('path');
const pdf = require('html-pdf')
const { ObjectId } = require('mongodb');
const html_to_pdf = require('html-pdf-node')

// remove the unrequired fields from the queried data 
const getFilteredObject = (object) => {
    if (!object || !Object.keys(object).length) return object
    let { _id, createdAt, createdBy, deletedBy, deletedAt, updatedAt, updatedBy, ...filteredData } = object;
    filteredData.id = _id;
    return filteredData;
}

// prepare start and end date of experience 
const prepareExperienceData = (array) => {
    const days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let mapDate = date => {
        let mappedDate = date;
        if (date == 'present') return date
        date = new Date(date);
        mappedDate = date.getFullYear();
        mappedDate += ` ${days[date.getMonth()]}`;
        return mappedDate;
    }
    return array.map((item) => {
        if (item.startDate) item.startDate = mapDate(item.startDate);
        if (item.endDate) item.endDate = mapDate(item.endDate);
        return item
    })
}

// get template file
const tempateCodeToFile = require('../../../helpers/constants/templates')
const getTemplateFile = (templateCode) => tempateCodeToFile[templateCode+'']
 
const getPdf = async (req, res, next) => {
    const userId = req.user.id;
    const templateId = req.query.templateId;

    const Users = req.db.collection('users');
    const Profiles = req.db.collection('profiles');
    const Education = req.db.collection('education');
    const Experiences = req.db.collection('experiences');
    const Skills = req.db.collection('skills');
    const Certifications = req.db.collection('certifications');
    const Templates = req.db.collection('templates');

    try {

        let templateCode = 100
        if(templateId) {
            let selectedTemplate = await Templates.findOne({_id : ObjectId(templateId)})
             templateCode = selectedTemplate?.code ? selectedTemplate.code : templateCode;
        }

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
                    experiences: prepareExperienceData(await result[2].value.toArray()),
                    education: prepareExperienceData(await result[3].value.toArray()),
                    skills: getFilteredObject(result[4].value),
                    certifications: prepareExperienceData(await result[5].value.toArray()),
                };

                console.log(displayData, `${getTemplateFile(templateCode)}/index.ejs`)

                // convert html to pdf

                return res.render(`${getTemplateFile(templateCode)}/index.ejs`, { user: displayData }, async function (err, html) {
                    if (err) {
                        console.log(err);
                        res.json({success:false, message: err.message })
                    }

                    html_to_pdf.generatePdf({ content: html },
                        { format: 'A4', margin: { top: "20px", bottom: "20px", right: "20px", left: "20px" } })
                        .then(pdfBuffer => {

                            // console.log("PDF Buffer:-", pdfBuffer);
                            res.header('content-type', 'application/pdf');
                            res.send(pdfBuffer)
                        })
                        .catch(error => {
                            console.log(error)
                        });

                    console.log('jjf')
                   /*  pdf.create(html, {
                        format: "A4",
                        border: { top: "20px", bottom: "20px"}
                    }).toBuffer(function (err, buffer) {
                        if (err) console.log(err)
                        res.header('content-type', 'application/pdf');
                        res.send(buffer)
                    }) */
              
                })


            })
            .catch(error => { 
                console.log(error) ;
                next(err) 
            })




        // resHelper.successResponse(res, 'Getting pdf')
    } catch (error) {
        next(error)
    }
}

module.exports = getPdf