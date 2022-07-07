
const { StatusCodes, ReasonPhrases } = require('http-status-codes')


class ResponseError extends Error {
    constructor(message, code) {
        super(message)
        this.message = message || 'Something went wrong';
        this.code = code || StatusCodes.INTERNAL_SERVER_ERROR
    }

    getResponse = () => {
        return {
            success: false,
            message: this.message
        }
    }

};

module.exports = ResponseError;