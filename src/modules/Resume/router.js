const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf-node')
const html_pdf = require('html-pdf');
const router = require('express').Router();
const jwt = require('jsonwebtoken')

const insertResumeController = require('./insert');

router.post('/', insertResumeController)


const resHelper = require('../../helpers/responseHelper')

const Authenticate = (req, res, next) => {
    let token = req.headers['authorization'] || req.headers['Authorization'] || req.query.token;
    try {
        if (!token) return resHelper.errorResponse(res, 'Token is required', 401);
        let decoded = jwt.verify(token, "19Uxyv3jiQx2BcEqNmXq60sdbfwBbpJpmkivuX4dYcMdYppYw0qZTAKKyk5Jlmy");
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error);
        resHelper.errorResponse(res, error.message, 401)
    }
}

router.get('/getPdf', Authenticate, async (req, res, next) => {
    let options = { format: 'A4' };
    let templateOne = require('../../views/templateone')
    let userId = req.user.id;
    const db = req.db

    try {
        // fetch all data from database

        Promise.allSettled([
            db.collection('users').findOne({ _id: userId }),
            db.collection('profiles').find({ userId }),
            db.collection('education').find({ userId }),
            db.collection('experiences').find({ userId }),
            db.collection('certifications').find({ userId }),
            db.collection('skills').findOne({ userId })
        ])
            .then(async result => {
                console.log(result)

                // get basic information
                let basicInfo = result[0].value;

                // get profiles
                let profilesCursor = result[1].value
                let profiles = [];
                while (await profilesCursor.hasNext()) profiles.push(await profilesCursor.next())

                // get education
                let educationCursor = result[2].value
                let education = [];
                while (await educationCursor.hasNext()) education.push(await educationCursor.next())

                // get experiences 
                let experiencesCursor = result[3].value
                let experiences = [];
                while (await experiencesCursor.hasNext()) experiences.push(await experiencesCursor.next())

                // get certifications 
                let certificationsCursor = result[4].value
                let certifications = [];
                while (await certificationsCursor.hasNext()) certifications.push(await certificationsCursor.next())

                let skills = result[5].value
                console.log(skills)

                // edit the template
                // basic info
                let { fullname, email, address, phone, role, summary } = basicInfo
                templateOne = templateOne.replace("%fullname%", `<h1>${fullname}</h1>`);
                templateOne = templateOne.replace("%role%", `<h2>${role}</h2>`)
                templateOne = templateOne.replace("%email%", `<h3><a href="mailto:${email}">${email}</a></h3>`)
                templateOne = templateOne.replace('%phone%', `<h3>${phone}</h3>`)
                templateOne = templateOne.replace('%address%', `<h3>${address}</h3>`)
                templateOne = templateOne.replace('%summary%', `${summary}`)

                // edit skills
                let { _id, userId, createdAt, createdBy, updatedAt, updatedBy, ...filteredSkills } = skills
                templateOne = templateOne.replace('%skills%', Object.keys(filteredSkills).map(skills => `
                <div class="talent">
									<h2>${skills}</h2>
									<ul>
                                    ${filteredSkills[skills].map(skill => `<li>${skill}</li>`).toString('')}
                                    </ul>
								</div>
                `).toString(''))

                let pdfBuffer = await pdf.generatePdf({ content: templateOne }, options);
                res.header('content-type', 'application/pdf');
                res.send(pdfBuffer)
            })
            .catch(error => resHelper.errorResponse(res, 'Error fetching pdf. Please retry !', 501))
        // resHelper.errorResponse(res, 'Error fetching pdf. Please retry !', 501)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/getPdf/ejs', Authenticate, async (req, res, next) => {

    let demoData = JSON.parse(fs.readFileSync(path.join(__dirname,'../../demoData/create-resume.json')))
    demoData.fullname = 'Jane Doe'
    // return res.render('resumeTemplateOne', { data: demoData })
    return res.render('resumeTemplateOne', { data: demoData }, function (err, html) {
        if (err) console.log(err);

        html_pdf.create(html, {
            format : "A4",
            
        }).toBuffer(function (err, buffer) {
            console.log('This is a buffer:', Buffer.isBuffer(buffer));
            res.header('content-type', 'application/pdf');
            res.send(buffer)
        });


        // html_pdf.create(html).toFile(path.join(__dirname , '../../../public/uploads/resumeTemplateTwo.pdf'), function(err,result) {
        //     if(err) console.log(err);
        //     let dataFile = fs.readFileSync(result.filename)
        //     res.header('content-type','application/pdf');
        //     res.send(dataFile)
        // })
    })
})

module.exports = router; 