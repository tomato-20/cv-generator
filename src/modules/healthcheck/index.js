const router = require('express').Router();


router.get('/', async (req,res,next) => {
    let healthcheck = {
        uptime : process.uptime(),
        responsetime : process.hrtime(),
        message: "OK",
        timestamp : Date.now()
    }
    try {

        res.status(200).send(healthcheck)
    } catch (error) {
        res.status(503).send();
    }
})

module.exports = router;