const {StatusCodes, ReasonPhrases} = require('http-status-codes')

class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.message = message;
        this.code = StatusCodes.UNAUTHORIZED
        this.type = ReasonPhrases.UNAUTHORIZED
    }

};

module.exports = Unauthorized;