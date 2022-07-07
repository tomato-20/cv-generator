((ResponseHelper) => { 

    const {StatusCodes} = require('http-status-codes')

    ResponseHelper.successResponse = (message, data, res) => {
        return res.status(StatusCodes.OK).json({
            success: true,
            data,
            message
        })
    },


    ResponseHelper.errorResponse = (status, message, res) => {
        return res.status(status || StatusCodes.BAD_REQUEST).json({
            success: false,
            message: message || "Error message"
        })
    }
})(module.exports)