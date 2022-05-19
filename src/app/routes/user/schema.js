const response_mediums = require("../schemas/common/response");
const header_mediums = require("../schemas/common/header");
const { type, properties } = require("../schemas/common/header");
const { required } = require("nodemon/lib/config");

const schema_group_name = "Uploads";
const schema_group_tag = [schema_group_name];


// mobile login
const mobile_login_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210' }
    },
    required: ['phone']
};

// Varify OTP Schema
const verify_otp_schema = {
    type: 'object',
    properties: {
        phone: { type: 'string', example: '+919876543210' },
        otp: { type: 'number', example: '123456' }
    },
    required: ['phone']
};

// Add Family member/relatives schema
const add_member_schema = {
    type:'object',
    properties: {
        full_name: { type:'string', default:'Pragati Tiwari'},
        phone: { type: 'string',default:'+918765432123'},
        gender: { type:'string', default:'female'},
        dob: {type:'string',default:'01/01/2000'},
        relation: {type: 'string', default:'sister'}
    },
    required:['full_name','phone','gender','dob','relation'],
}

// Update user details schema
const user_update_schema = {
    type: 'object',
    properties:{
        full_name:{type:'string', default:'Pragati'},
        gender:{type:'string', default:'female'},
        dob:{type:'string' , default:'26/01/1999'},
        health_id: {type:'string', default: '12345679980'},
    },
    required: ['full_name','gender','dob','health_id']
};

// Upload user Profile Schema
const upload_schema = {
    type: "object",
    properties: {
      media_type: {
        type: "string",
        example: "pre_installation",
        description:
          "pre_installation | post_installation | check_in | check_out",
      },
      reference_id: {
        type: "number",
        example: 1,
        description: "Reference Id for the Upload",
      },
    },
  };




module.exports = {

    mobile_login:{
        description:'Mobile Login',
        tags: ['Authentication'],
        required: true,
        summary: 'Mobile Login Endpoint for all the Login process related to mobile number.',
        body: mobile_login_schema,
        response: response_mediums
    },
    verify_otp:{
        description:'Mobile Login',
        tags: ['Authentication'],
        summary: 'Confirm mobile OTP for authentication. If user Exist They will get all their details and If not exist they have to update their details with the help of generated token',
        body: verify_otp_schema,
        response: response_mediums
    },
    update: {
        summary: 'Update user details with the help of token.',
        description:'Update User Data',
        tags: ['Authentication'],
        headers:header_mediums,
        body: user_update_schema,
        response: response_mediums
    },
    uploads: {
        description: "Media " + schema_group_name + " for the Curepe app",
        tags: schema_group_tag,
        tags: ['Authentication'],
        summary: "Media " + schema_group_name,
        querystring: upload_schema,
        headers: header_mediums,
        response: response_mediums,
    },
    add_member: {
        summary: 'User can add their family member with the help of their unique generated token',
        description:'add member Data',
        tags: ['Authentication'],
        headers:header_mediums,
        body: add_member_schema,
        response: response_mediums
    },
    retrieve_all_particular_members: {
        description: 'Get the User details',
        tags: ['Authentication'],
        summary: 'Retrieve all members details with the help of any token.',
        headers: header_mediums,
        response: response_mediums
    },
    retrieve_all_members: {
        description: 'Get the User details',
        tags: ['Authentication'],
        summary: 'Retrieve all members details with the help of any token.',
        headers: header_mediums,
        response: response_mediums
    },
    retrieve: {
        description: 'Get the User details',
        tags: ['Authentication'],
        summary: 'Get all the User details',
        headers: header_mediums,
        response: response_mediums
    },

};
