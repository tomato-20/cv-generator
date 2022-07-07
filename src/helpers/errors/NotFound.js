const {StatusCodes, ReasonPhrases} = require('http-status-codes')

class NotFound extends Error {
    constructor(message) {
        super(message)
        this.message = message;
        this.code = StatusCodes.NOT_FOUND
        this.type = ReasonPhrases.NOT_FOUND
    }

};

module.exports = NotFound;