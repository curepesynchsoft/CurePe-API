const response_mediums = require("../schemas/common/response");
const header_mediums = require("../schemas/common/header");

const user_creation_schema = {   
    type: 'object',
    properties: {
        full_name: { type: 'string', default: 'Adarsh Srivastava' },
        // phone: { type: 'string', default: '+919839339903' },
        email: { type: 'string', default: 'adarsh.srivastava@synchsoft.in'},
        dob: { type: 'string', default: '01/01/1999'},
        passkey: { type: 'string', default: 'password@!' },
        // time_zone: { type: 'string', default: 'UTC or Asia/Kolkata' }
    },
    required: ['full_name', 'email', 'dob','passkey']
};

const user_login_schema = {
    type: 'object',
    properties: {
        email: { type: 'string', default: 'ada.srivastava@synchsoft.in'},
        passkey: { type: 'string', default: 'password@!' },
    },
    required: ['email','passkey']
}

const user_update_schema = {
    type: 'object',
    required: ['id']
};

module.exports = {
    create: {
        description: 'Create a User',
        tags: ['Authentication'],
        summary: 'Create an App User',
        body: user_creation_schema,
        response: response_mediums
    },
    login: {
        description: 'Login a User',
        tags: ['Authentication'],
        summary: 'Login an App User',
        body: user_login_schema,
        response: response_mediums
    },
    update: {
        description: 'Update User',
        tags: ['Authentication'],
        summary: 'Update User Data',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'User id'
                }
            }
        },
        querystring: user_update_schema,
        response: response_mediums
    },
    retrieve: {
        description: 'Get the User details',
        tags: ['Authentication'],
        summary: 'User details',
        headers: header_mediums,
        response: response_mediums
    }
};