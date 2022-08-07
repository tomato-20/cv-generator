exports.successDataResponse  = (data) => ({
    type: "object",
    properties: {
        success: {
            type: "boolean"
        },
        data,
        message: {
            type: "string"
        },
        status : {
            type: "integer",
            default: 200,
            description : "response status code",
        },
    }
})

exports.errorResponse = {
    type : "object", 
    properties : {
        success : {
            type: "boolean",
            default : false,
        },
        status : {
            type: "integer",
            description : "response status code",
        },
        message : {
            type : "string",
        }
    }
}