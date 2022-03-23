const response_mediums = require("../schemas/common/response");
const header_mediums = require("../schemas/common/header");
const { type, properties } = require("../schemas/common/header");
const { required } = require("nodemon/lib/config");

//admin login
// const admin_login_schema = {
//     type: 'object',
//     properties: {
//         phone: { type: 'string', example: '+918736894535'}
//     },
//     required: ['phone']
// };

const verify_otp_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+918736894535' },
        otp: { type: 'number', example: '123456' }
    },
    required: ['phone']
};

const admin_update_schema = {
    type: 'object',
    properties:{
        full_name:{type:'string', default:'Pragati'},
        phone :{type:'string', default: '+918736894535'}
    },
    required: ['full_name','phone']
};


const admin_login_schema = {
    type: 'object',
    properties: {
        email: { type: 'string', default: 'ada.srivastava@synchsoft.in'},
        passkey: { type: 'string', default: 'password@!' },
    },

    required: ['email','passkey']
}


module.exports = {
    admin_login: {
        description: 'Admin_login',
        tags: ['Admin'],
        summary: 'Admin Login panel',
        body: admin_login_schema,
        response: response_mediums
    },

    verify_admin_otp:{
        description:'Mobile Login',
        tags: ['Admin'],
        summary: 'Mobile Login Endpoint for all the Login process related to mobile number',
        body: verify_otp_schema,
        response: response_mediums
    },
    admin_update_schema:{}
}