
const jwt = require('jsonwebtoken')

const { TOKEN_SECRET } = require('../config/app.config')
const resHelper = require('../helpers/responseHelper')

module.exports = (req, res, next) => {
    try {

        let token = req.headers["authorization"] || req.headers["Authorization"] || req.query.token

        if (!token) resHelper.errorResponse(res, 'Token is required', 401)

        jwt.verify(token, TOKEN_SECRET, function (err, decoded) {
            if (err) resHelper.errorResponse(res, err.message || 'Invalid Token', 401)

            req.user = decoded
        })

        next()

    } catch (error) {
        next(error)
    }
}