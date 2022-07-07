const customErrors = require('../helpers/errors')

module.exports = (err, req, res, next) => {


    if (
        err instanceof customErrors.BadRequest ||
        err instanceof customErrors.Forbidden ||
        err instanceof customErrors.Unauthorized ||
        err instanceof customErrors.NotFound
    ) {
        return res.status(err.code).json({
            success: false,
            messge: err.message
        })
    } 

    if (!err.status) console.error(err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || err.msg || 'Internal Server Error'
    })
    
}