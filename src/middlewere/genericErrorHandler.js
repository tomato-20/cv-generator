const customErrors = require('../helpers/errors')

module.exports = (err, req, res, next) => {

    
    if (
        err instanceof customErrors
        ) {
            return res.status(err.code).json(err.getResponse())
        } 
        
    if (!err.status) console.error(err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || err.msg || 'Internal Server Error'
    })
    
}