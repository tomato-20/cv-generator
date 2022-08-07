((ResponseHelper) => {
    const { StatusCodes } = require('http-status-codes')
    ResponseHelper.successResponse = (res, message, data = undefined , status) => {

        return res.status(status || StatusCodes.OK).json({
            success: true,
            data,
            status: status || StatusCodes.OK ,
            message
        })
    },


        ResponseHelper.errorResponse = (res, message, status) => {
            return res.status(status || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: message || "Error message",
                status: status || StatusCodes.BAD_REQUEST  
            })
        }
})(module.exports)
