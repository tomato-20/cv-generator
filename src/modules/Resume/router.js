const router = require('express').Router();

router.use('/create',(req,res,next)=>{
    res.json({
        message:"POST create resume"
    })
})

module.exports = router;