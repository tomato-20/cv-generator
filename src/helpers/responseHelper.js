((ResponseHelper) => { 

    const {StatusCodes} = require('http-status-codes')

    ResponseHelper.successResponse = (res, message, data ) => {
        return res.status(StatusCodes.OK).json({
            success: true,
            data,
            message
        })
    },


    ResponseHelper.errorResponse = ( res, message, status) => {
        return res.status(status || StatusCodes.BAD_REQUEST).json({
            success: false,
            message: message || "Error message"
        })
    }
})(module.exports)