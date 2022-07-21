const resHelper = require('../../../helpers/responseHelper')

const path = require('path');
const pdf = require('html-pdf')
const html_to_pdf = require('html-pdf-node')
const fs = require('fs')

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

const getPdf = async (req, res, next) => {
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
                let temp = [];



                displayData = {
                    ...getFilteredObject(result[0].value),
                    social: await result[1].value.toArray(),
                    experiences: prepareExperienceData(await result[2].value.toArray()),
                    education: prepareExperienceData(await result[3].value.toArray()),
                    skills: getFilteredObject(result[4].value),
                    certifications: await result[5].value.toArray(),
                };

                console.log(displayData)


                // convert html to pdf

                return res.render('TemplateTwo/index.ejs', { user: displayData }, async function (err, html) {
                    if (err) {
                        console.log(err);
                        res.json({ message: err.message })
                    }

                    /* html_to_pdf.generatePdf({ content: html },
                        { format: 'A4', margin: { top: "20px", bottom: "20px", right: "20px", left: "20px" } })
                        .then(pdfBuffer => {

                            // console.log("PDF Buffer:-", pdfBuffer);
                            res.header('content-type', 'application/pdf');
                            res.send(pdfBuffer)
                        })
                        .catch(error => {
                            console.log(error)
                        }); */

                    console.log('jjf')
                    pdf.create(html, {
                        format: "A4",
                        border: { top: "20px", bottom: "20px"}
                    }).toBuffer(function (err, buffer) {
                        if (err) console.log(err)
                        // fs.writeFileSync('template.pdf',buffer);
                        res.header('content-type', 'application/pdf');
                        res.send(buffer)
                    })
              
                })


            })
            .catch(error => { console.log(error) })




        // resHelper.successResponse(res, 'Getting pdf')
    } catch (error) {
        next(error)
    }
}

module.exports = getPdf