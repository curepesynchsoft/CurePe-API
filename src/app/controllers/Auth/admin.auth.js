const { use } = require("bcrypt/promises");
const HttpStatusCode = require("http-status-codes/index");
// import Model from the models directory
const admin_model = require("../../models/admin.model");
const subadmin_model = require("../../models/subadmin.model");
// importing the utilities plugin for extra jobs
let utilites = require("../../common-helpers/utilities");
// messages constants
let messages = require("../../constants/messages");
const response = require("../../routes/schemas/common/response");

const admin_login= async (request, reply) => {
    const response_payload = {}
    response_payload.phone = request.body.phone;
  
    let admin = await admin_model.findUnique({ phone: request.body.phone });
    try {
      if (admin) {
        //admin already exists , we must update the OTP and resend a new OTP, update the same row at the same time
        // let new_otp = utilites.GenerateOTP();
        let new_otp = admin_model.otp
        let update_document = {
          otp: {
            set: new_otp,
          },
        };
        admin = await admin_model.findUnique(
          { phone: request.body.phone },
          update_document
        );
        // prepare a payload admin
        response_payload.already_registered = true;
        response_payload.otp = new_otp;
        // return the response here
        return reply.send({ data: { ...response_payload } });
      } else {
        response_payload.already_registered = false;
        //create a admin here and send out a OTP
        //return the response
        return reply.send({ data: { ...response_payload } });
        
      }
    } catch (error) {
      // console.log(error);
      return reply.code(500).send({ error: { ...error } });
    }
  };

 // Verify OTP
const verify_through_otp = async (request, reply) => {
  // run a model
  try {
    const admin = await admin_model.findUnique(
      { phone: request.body.phone }
    );
    if (admin.otp === request.body.otp) {
      if (!admin.verified) {
        admin_model.findUnique({ phone: request.body.phone }, { verified: true });
        admin.verified = true;
      }
      let payload = {};
      payload.admin = admin;
      payload.access_token = global.app.jwt.sign(admin);
      return reply.send({ data: { ...payload } });
    } else {
      return reply.code(422).send({ error: {} });
    }
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// update admin values
// const update_admin = async (request, reply) => {
//   try {
//     const update_document = {
//       full_name : request.body.full_name,
//       phone : request.body.phone
      
//     };
//     const admin = await admin_model.update({ id: request.admin.id }, update_document);
//     if(admin) {      
//       const admin = await admin_model.findUnique(
//         { phone: request.admin.phone }
//       )
//     }
//     //return the response here
//     return reply.send({ data: { admin } });
//   } catch (error) {
//     return reply.code(422).send({ error: { ...error } });
//   }
// }
const update_admin = async (request, reply) => {
  try {
    const update_document = {
      full_name : request.body.full_name,
      phone : request.body.phone
      
    };
    const admin = await admin_model.update({ id: request.admin.id }, update_document);
    // if(admin) {      
    //   // const admin = await admin_model.findUnique(
    //     { phone: request.admin.phone }
      
    // }
    //return the response here
    return reply.send({ data: { admin } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

const admin = async(request, reply) => {
  try {
    const admin_data = await admin_model.findMany(request.body);
    reply.send({ data: admin_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
const add_subadmin = async (request, reply) => {
  let response = []
  //try {
  const new_member = {
    full_name: request.body.full_name,
    phone: request.body.phone,
    otp: request.body.otp,
  };
  //Required fields
  response.add_subadmin = await admin_model.create(new_member)
  return reply.send({ data: { ...response } });
  // }
  //
}

// update user values

  module.exports = {
    admin_login,
    verify_through_otp,
    admin,
    update_admin,
    add_subadmin
  }
