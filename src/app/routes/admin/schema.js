const response_mediums = require("../schemas/common/response");
const header_mediums = require("../schemas/common/header");
const { type, properties } = require("../schemas/common/header");
const { required } = require("nodemon/lib/config");

//admin login
const admin_login_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210'}
    },
    required: ['phone']
};

const verify_otp_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210' },
        otp: { type: 'number', example: '591215' }
    },
    required: ['phone']
};

const admin_update_schema = {
    type: 'object',
    properties:{
        full_name:{type:'string', default:'Pragati'},
        phone :{type:'string', default: '+919876543210'}
    },
    required: ['full_name','phone']
};
const add_member_schema = {
    type:'object',
    properties: {
        full_name: { type:'string', default:'Pragati Tiwari'},
        phone: { type: 'string',default:'+918765432123'},
        otp: { type:'string', default:'123456'},
        // dob: {type:'string',default:'01/01/2000'},
        // relation: {type: 'string', default:'sister'},
        // health_id: {type:'string', default:'name123'}
    },
    required:['full_name','phone','otp'],
}

const add_subadmin_schema = {
    type: 'object',
    properties: {
        full_name: { type: 'string', default: 'Atul' },
        phone: { type: 'string', default: '+ 919651964208'
    },
    otp: { type: 'number', example: '591215' }
},
    required: ['full_name', 'phone', 'otp'],
}
const perticular_member = {
    type: 'object',
    properties: {
    userId: { type: 'integer', default: '1' },
    },
    required: ['userId'],
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
    update: {
        summary: 'Update admin details with the help of token.',
        description:'Update admin Data',
        tags: ['Admin'],
        headers:header_mediums,
        body: admin_update_schema,
        response: response_mediums
    },
    retrieve: {
        description: 'Get the User details',
        tags: ['Admin'],
        summary: 'Get all the User details',
        headers: header_mediums,
        response: response_mediums
    },
    add_subadmin: {
        summary: 'User can add their family member with the help of their unique generated token',
        description: 'add member Data',
        tags: ['Admin'],
        //headers:header_mediums,
        body: add_subadmin_schema,
        response: response_mediums
    },
    per_member: {
        summary: 'user member details',
        description: 'member details',
        tags: ['Admin'],
        body: perticular_member,
        response: response_mediums
        
    }

}
