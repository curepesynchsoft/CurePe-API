const response_mediums = require("../schemas/common/response_codes");

const user_creation_schema = {
    type: 'object',
    properties: {
        full_name: { type: 'string', example: 'Adarsh Srivastava' },
        phone: { type: 'string', example: '+919839339903' },
        passkey: { type: 'string', example: 'password@!' },
        time_zone: { type: 'string', example: 'UTC or Asia/Kolkata' }
    },
    required: ['full_name', 'phone', 'passkey','time_zone']
};

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
        // params: {
        //     type: 'object',
        //     properties: {
        //         id: {
        //             type: 'string',
        //             description: 'User id'
        //         }
        //     }
        // },
        response: response_mediums
    }
};