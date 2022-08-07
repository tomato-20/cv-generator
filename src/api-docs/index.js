const { successDataResponse, errorResponse } = require('./schema/responses'),
    { user } = require('./schema/user'),
    { resume, skills, education, certification, experience } = require('./schema/resume')

module.exports = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "CV generator API",
        description: "This is API for cv generator app",
    },
    servers: [{
        url: "http://localhost:3430/api/v1"
    }],
    tags: [
        {
            name: "user",
            description: "get user details"
        },
        {
            name: "auth",
            description: "user creation, authentication, password change"
        },
        {
            name: "resume",
            description: "everything about resume data"
        },
        {
            name: "healthcheck",
            description: "check health of app"
        }
    ],
    paths: {
        "/user": {
            get: {
                tags: ["user"],
                summary: "get detail of user",
                description: "get user detail including its resume details",
                produces: ["application/json"],
                security: [{
                    token: []
                }],
                responses: {
                    "200": {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: successDataResponse({
                                    type: "object",
                                    properties: {
                                        ...user.properties,
                                        ...resume.properties,
                                        password: undefined,
                                        industyKnowledge: undefined,
                                        programmingSkills: undefined,
                                        tools: undefined,
                                        skills,
                                        userId: user.properties.id
                                    }
                                }
                                )
                            }
                        },
                    },
                    "400": {
                        description: "Cannot fetch user try again!",
                    },
                    "401": {
                        description: "token required or token expired"
                    }
                }
            }
        },

        "/auth/register": {
            post: {
                tags: ["auth"],
                summary: "create new user",
                description: "create new user",
                consumes: ["appication/json"],
                produces: ["application/json"],
                requestBody: {
                    description: "Object containing user information",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/user"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'OK',
                    },
                    400: {
                        description: "User already exist!"
                    }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ["auth"],
                summary: "logs user into the system",
                description: "logs user into the system",
                consumes: ["appication/json"],
                produces: ["application/json"],
                requestBody: {
                    description: "Object containing user information",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                        format: "email"
                                    },
                                    password: {
                                        type: "string"
                                    }
                                },
                                required: ["email", "password"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: successDataResponse({ type: "object", properties: { token: { type: "string" } } }),
                            }
                        }

                    },
                    401: {
                        description: "Invalid credentials"
                    },
                    40: {
                        description: "Bad Request"
                    }

                }
            }
        },
        "/resume": {
            post: {
                tags: ["resume"],
                summary: "insert data into the user resume",
                description: "takes data object to be inserted into the user resume",
                consumes: ["application/json", "application/x-www-form-urlencoded"],
                produces: ["application/json"],
                security: [{
                    token: []
                }],
                requestBody: {
                    description: "data object to populate the user resume",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/resume"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "OK",
                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "Token required. or Invalid token."
                    }
                }
            }
        },
        "/resume/add/experience": {
            post: {
                tags: ["resume"],
                summary: "add experience to resume",
                description: "experience object to be added to the resume. returns the id of newly inserted data",
                consumes: ["appication/json"],
                produces: ["application/json"],
                security: [{
                    token: []
                }],
                requestBody: {
                    description: "experience object",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/experience"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: successDataResponse({ type: "object", properties: { id: { type: "string", format: "uuid" } } }),
                            }
                        }

                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "Token required. or Invalid token."
                    }
                }
            }
        },
        "/resume/add/education": {
            post: {
                tags: ["resume"],
                summary: "add education to resume",
                description: "education object to be added to the resume. returns the id of newly inserted data",
                consumes: ["appication/json"],
                produces: ["application/json"],
                security: [{
                    token: []
                }],
                requestBody: {
                    description: "education object",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/education"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: successDataResponse({ type: "object", properties: { id: { type: "string", format: "uuid" } } }),
                            }
                        }

                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "Token required. or Invalid token."
                    }
                }
            }
        },
        "/resume/add/certification": {
            post: {
                tags: ["resume"],
                summary: "add certification to resume",
                description: "certification object to be added to the resume. returns the id of newly inserted data",
                consumes: ["appication/json"],
                produces: ["application/json"],
                security: [{
                    token: []
                }],
                requestBody: {
                    description: "certification object",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/certification"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: successDataResponse({ type: "object", properties: { id: { type: "string", format: "uuid" } } }),
                            }
                        }

                    },
                    400: {
                        description: "Bad request"
                    },
                    401: {
                        description: "Token required. or Invalid token."
                    }
                }
            }
        },
        "/resume/edit/skills": {
            put: {
                tags: ["resume"],
                summary: "edit skills of user",
                description: "edit skills (any of industryKnowledge, programmingKSkills, tools) of user",
                consumes: ["application/json"],
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/skills"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/edit/profile": {
            put: {
                tags: ["resume"],
                summary: "edit profile of user",
                description: "edit basic profile of user",
                consumes: ["application/json"],
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    fullname: {
                                        type: "string"
                                    },
                                    role: {
                                        type: "string"
                                    },
                                    summary: {
                                        type: "string"
                                    },
                                    website: {
                                        type: "string",
                                        format: "url",
                                        example: "http:/example.com"
                                    },
                                    address: {
                                        type: "string",

                                    },
                                    phone: {
                                        type: "string",
                                        description: "must be a 10 digit number",
                                        example: "9000000000"
                                    }

                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }

            }
        },
        "/resume/edit/experience/{id}": {
            put: {
                tags: ["resume"],
                summary: "edit one experience",
                description: "edit one experience using id",
                consumes: ["application/json"],
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }],
                requestBody: {
                    description: "experience object with optional fields",
                    content: {
                        "application/json": {
                            schema: { ...experience, required: undefined }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/edit/education/{id}": {
            put: {
                tags: ["resume"],
                summary: "edit one education",
                description: "edit one education using id",
                consumes: ["application/json"],
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }],
                requestBody: {
                    description: "education object with optional fields",
                    content: {
                        "application/json": {
                            schema: { ...education, required: undefined }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/edit/certification/{id}": {
            put: {
                tags: ["resume"],
                summary: "edit one certification",
                description: "edit one certification using id",
                consumes: ["application/json"],
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }],
                requestBody: {
                    description: "certification object with optional fields",
                    content: {
                        "application/json": {
                            schema: { ...certification, required: undefined }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/delete/experience/{id}": {
            delete: {
                tags: ["resume"],
                summary: "delete one experience",
                description: "delete one experience object with id provided in the parameter",
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    }
                }],
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/delete/education/{id}": {
            delete: {
                tags: ["resume"],
                summary: "delete one education",
                description: "delete one education object with id provided in the parameter",
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    }
                }],
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/delete/certification/{id}": {
            delete: {
                tags: ["resume"],
                summary: "delete one certification",
                description: "delete one certification object with id provided in the parameter",
                produces: ["application/json"],
                security: [
                    { token: [] }
                ],
                parameters: [{
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    }
                }],
                responses: {
                    "200": {
                        description: "OK"
                    },
                    "401": {
                        description:
                            "Token required or invalid token",
                    },
                    "404": {
                        description:
                            "Bad request"
                    }
                }
            }
        },
        "/resume/getPdf": {
            get: {
                tags: ["resume"],
                summary: "get the resume in pdf format",
                description: "get the resume in pdf format as selected template",
                produces: ["application/pdf"],
                security: [
                    { token: [] }
                ],
                responses: {
                    "200": {
                        description: "A pdf file",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    },
                    "401": {
                        description: "Token required or Invalid token."
                    }
                }
            }
        },
        "/healthcheck": {
            get: {
                servers: [
                    {
                        url: "http://localhost:3430"
                    }
                ],
                tags: ["healthcheck"],
                summary: "check server health",
                responses: {
                    200: {
                        description: "OK"
                    },
                    503: {
                        description: "Service unavailable"
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            errorResponse: errorResponse,
            user,
            resume,
            experience,
            certification,
            education,
            skills
        },
        securitySchemes: {
            basic: {
                type: "http",
                scheme: "basic"
            },
            token: {
                type: "apiKey",
                in: "header",
                name: "Authorization"
            }
        }
    }
}
