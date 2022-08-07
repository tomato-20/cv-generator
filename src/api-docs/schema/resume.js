
const experience = {
    type: "object",
    required: ["organization", "position", "summary", "startDate", "endDate"],
    properties: {
        id: {
            type: "string",
            format: "uuid"
        },
        organization: {
            type: "string"
        },
        position: {
            type: "string"
        },
        location: {
            type: "string"
        },
        startDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD",
            example: "2020-02-20"
        },
        endDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD or string 'present'",
            example: "2020-02-20"
        },
        summary: {
            type: "string"
        },
        description: {
            type: "array",
            items: {
                type: "string"
            }
        }
    },
}
const education = {
    type: "object",
    required: ["institution", "course", "startDate", "endDate", "location"],
    properties: {
        id: {
            type: "string",
            format: "uuid"
        },
        institution: {
            type: "string"
        },
        course: {
            type: "string"
        },
        location: {
            type: "string"
        },
        startDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD",
            example: "2020-02-20"
        },
        endDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD or string 'present'",
            example: "2020-02-20"
        }
    },
}
const certification = {
    type: "object",
    required: ["institution", "course", "startDate", "endDate"],
    properties: {
        id: {
            type: "string",
            format: "uuid"
        },
        institution: {
            type: "string"
        },
        course: {
            type: "string"
        },
        startDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD",
            example: "2020-02-20"
        },
        endDate: {
            type: "string",
            description: "string representing date format YYYY-MM--DD or string 'present'",
            example: "2020-02-20"
        }
    },
}
const resume = {
    type: "object",
    required: ["role", "summary"],
    properties: {
        resumeId: {
            type: "string",
            format: "uuid"
        },
        role: {
            type: "string",
        },
        summary: {
            type: "string",
        },
        website: {
            type: "string",
            format: "url",
            example: "http:/example.com"
        },
        social: {
            type: "array",
            items: {
                type: "object",
                required: ["profile", "url"],
                properties: {
                    profile: {
                        type: "string",
                    },
                    url: {
                        type: "string",
                        format: "url"
                    }
                }
            }
        },
        experience: {
            type: "array",
            items: { ...experience }
        },
        education: {
            type: "array",
            items: { ...education }
        },
        certification: {
            type: "array",
            items: { ...certification }
        },
        industryKnowledge: {
            type: "array",
            description: "should contain at least two items",
            items: {
                type: "string"
            }
        },
        programmingSkills: {
            type: "array",
            description: "should contain at least two items",
            items: {
                type: "string"
            }
        },
        tools: {
            type: "array",
            description: "should contain at least two items",
            items: {
                type: "string"
            }
        },
    }
}

const skills = {
    type: "object",
    properties: {
        id: {
            type: "string",
            format: "uuid"
        },
        industyKnowledge: {
            type: "array",
            items: {
                type: "string"
            }
        },
        programmingSkills: {
            type: "array",
            items: {
                type: "string"
            }
        },
        tools: {
            type: "array",
            items: {
                type: "string"
            }
        },
    }
}

module.exports = {
    resume,
    certification,
    experience,
    education,
    skills
}