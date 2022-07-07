const {StatusCodes, ReasonPhrases} = require('http-status-codes')

class Forbidden extends Error {
    constructor(message) {
        super(message)
        this.message = message;
        this.code = StatusCodes.FORBIDDEN
        this.type = ReasonPhrases.FORBIDDEN
    }

};

module.exports = Forbidden;