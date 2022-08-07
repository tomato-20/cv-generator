exports.user =
{
    type: "object",
    required : ["fullname","email","address","phone","password"],
    properties: {
        fullname: {
            type: "string",
        },
        email: {
            type: "string",
            format : "email"
        },
        address: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        password : {
            type: "string",
        }
    }
}
