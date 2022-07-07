const {StatusCodes, ReasonPhrases} = require('http-status-codes')

class BadRequest extends Error {
    constructor(message) {
        super(message)
        this.message = message;
        this.code = StatusCodes.BAD_REQUEST
        this.type = ReasonPhrases.BAD_REQUEST
    }

};

module.exports = BadRequest;