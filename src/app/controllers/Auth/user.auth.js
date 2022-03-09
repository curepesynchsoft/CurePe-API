const { use } = require("bcrypt/promises");
const HttpStatusCode = require("http-status-codes/index");
// import Model from the models directory
const user_model = require("../../models/user.model");
const user_relative_model = require("../../models/userRelative.model");
// importing the utilities plugin for extra jobs
let utilites = require("../../common-helpers/utilities");
// twilio for SMS communication
// let twilio_client = require("../../services/twilio");
// messages constants
let messages = require("../../constants/messages");

const { ModelBuildContext } = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");
const response = require("../../routes/schemas/common/response");

// login user
// Create User
const create_user = async (request, reply) => {
  // run a model
  try {
  const new_user = {
    full_name: request.body.full_name,
    gender: request.body.gender,
    dob: request.body.dob,
  //   passkey: request.body.passkey,
  }

  const return_data = await user_model.create(new_user);

   // generate token
   const token = global.app.jwt.sign( return_data );
  return reply.send({ data:{ token } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};


// Verify OTP
const mobile_login = async (request, reply) => {
  let response_payload = {};
  response_payload.phone = request.body.phone;

  // Check if user Exists
  let user = await user_model.findUnique({ phone: request.body.phone });
  try {
    if (user) {
      //user already exists , we must update the OTP and resend a new OTP, update the same row at the same time
      let new_otp = utilites.GenerateOTP();
      let update_document = {
        otp: {
          set: new_otp,
        },
      };
      user = await user_model.update(
        { phone: request.body.phone },
        update_document
      );
      // prepare a payload user
      response_payload.already_registered = true;
      response_payload.otp = new_otp;
      //send out an OTP for login
      // await sendTwilioSMS(user.phone, new_otp);
      // return the response here
      return reply.send({ data: { ...response_payload } });
    } else {
      response_payload.already_registered = false;
      //create a user here and send out a OTP
      response_payload.user = await createUser(request, reply);
      //return the response
      return reply.send({ data: { ...response_payload } });
      
    }
  } catch (error) {
    // console.log(error);
    return reply.code(500).send({ error: { ...error } });
  }
};

const sendTwilioSMS = async (phone, otp) => {
  return await twilio_client
    .SendTwilioSMS(
      phone,
      messages.OTP_MESSAGE.replace("{otp}", otp).replace(
        "{app_name}",
        process.env.APP_NAME
      )
    )
    .then(function (message_result) {
      return message_result;
    });
};


const createUser = async (request, reply) => {
  const new_user = {
    full_name: request.body.full_name,
    phone: request.body.phone,
    otp: utilites.GenerateOTP(),
  };
  try {
    const return_data = await user_model.create(new_user);
    // await sendTwilioSMS(new_user.phone, new_user.otp);
    return return_data;
  } catch (error) {
    console.log(error);
    return reply.code(422).send({ error: { ...error } });
  }
};
// const updateUser = async (request, reply) => {
//   try {
//     const update_document = {
//       ...request.body,
//     };
//     user = await user_model.update({ id: request.user.id }, update_document);
//     // return the response here
//     return reply.send({ data: { user } });
//   } catch (error) {
//     return reply.code(422).send({ error: { ...error } });
//   }
// };

// Verify OTP
const verify_through_otp = async (request, reply) => {
  // run a model
  try {
    const user = await user_model.findUnique(
      { phone: request.body.phone }
    );
    if (user.otp === request.body.otp) {
      if (!user.verified) {
        user_model.update({ phone: request.body.phone }, { verified: true });
        user.verified = true;
      }
      let payload = {};
      payload.user = user;
      payload.access_token = global.app.jwt.sign(user);
      return reply.send({ data: { ...payload } });
    } else {
      return reply.code(422).send({ error: {} });
    }
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// update user values
const update_User = async (request, reply) => {
  try {
    const update_document = {
      full_name : request.body.full_name,
      gender :request.body.gender,
      dob: request.body.dob,
      health_id: request.body.health_id
    };
    const user = await user_model.update({ id: request.user.id }, update_document);
    if(user) {      
      const user_relative = await user_relative_model.findUnique(
        { phone: request.user.phone }
      )
      // console.log(user_relative)
    }
    // return the response here
    return reply.send({ data: { user } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// add relatives
const add_members = async (request, reply) =>{
  let response = []
  try {
    const return_data = await user_model.findUnique({id:request.user.id});
    if(return_data) {
      const new_member = {
        userId: request.user.id,
        full_name: request.body.full_name,
        phone: request.body.phone,
        gender:  request.body.gender,
        dob: request.body.dob,
        relation: request.body.relation
      };
      response.add_members = await user_relative_model.create(new_member)
      if (response.add_members) {
        response.user = await createUser(request, reply);
      }
      return reply.send({ data:{ ...response } });
    }
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
  
// fETCH uSER DETAILS
const get_user = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_model.findMany(request.body);
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

module.exports = {
  create_user,
  mobile_login,
  verify_through_otp,
  update_User,
  get_user,
  add_members,
};
