const response_mediums = require("../schemas/common/response");
const header_mediums = require("../schemas/common/header");

const user_creation_schema = {   
    type: 'object',
    properties: {
        full_name: { type: 'string', default: 'Adarsh Srivastava' },
        gender:{type:'string', default:'male'},
        // phone: { type: 'string', default: '+919839339903' },
        // email: { type: 'string', default: 'adarsh.srivastava@synchsoft.in'},
        dob: { type: 'string', default: '01/01/1999'},
        // passkey: { type: 'string', default: 'password@!' },
        // time_zone: { type: 'string', default: 'UTC or Asia/Kolkata' }
    },
    required: ['full_name','gender' ,'dob']
};

const mobile_login_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210' }
    },
    required: ['phone']
};

const verify_otp_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210' },
        otp: { type: 'number', example: '123456' }
    },
    required: ['phone']
};

const user_login_schema = {
    type: 'object',
    properties: {
        email: { type: 'string', default: 'ada.srivastava@synchsoft.in'},
        passkey: { type: 'string', default: 'password@!' },
    },

    required: ['email','passkey']
}

const add_member_schema = {
    type:'object',
    properties: {
        full_name: { type:'string', default:'Pragati Tiwari'},
        gender: { type:'string', default:'female'},
        dob: {type:'string',default:'01/01/2000'},
        relation: {type: 'string', default:'sister'}
    },
    // headers: header_mediums,
    required:['full_name','gender','dob','relation'],
}

const user_update_schema = {
    type: 'object',
    properties:{
        full_name:{type:'string', default:'Pragati'},
        gender:{type:'string', default:'female'},
        dob:{type:'string' , default:'26/01/1999'},
        // avatar: {type:'string',default:'img.jpg'}
    },
    required: ['full_name','gender','dob']
};

module.exports = {
    create: {
        description: 'Create a User',
        tags: ['Authentication'],
        summary: 'Create an App User',
        body: user_creation_schema,
        response: response_mediums
    },
    mobile_login:{
        description:'Mobile Login',
        tags: ['Authentication'],
        summary: 'Mobile Login Endpoint for all the Login process related to mobile number.',
        body: mobile_login_schema,
        response: response_mediums
    },
    verify_otp:{
        description:'Mobile Login',
        tags: ['Authentication'],
        summary: 'Mobile Login Endpoint for all the Login process related to mobile number.',
        body: verify_otp_schema,
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
        summary: 'Update User Data',
        description:'Update details',
        tags: ['Authentication'],
        headers:header_mediums,
        body: user_update_schema,
        response: response_mediums
    },
    add_member: {
        summary: 'add member Data',
        description:'Member details',
        tags: ['Authentication'],
        headers:header_mediums,
        body: add_member_schema,
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