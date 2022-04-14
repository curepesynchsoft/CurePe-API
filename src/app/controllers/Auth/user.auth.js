const { use } = require("bcrypt/promises");
const HttpStatusCode = require("http-status-codes/index");
// import Model from the models directory
const user_model = require("../../models/user.model");
const user_relative_model = require("../../models/userRelative.model");
// importing the utilities plugin for extra jobs
let utilites = require("../../common-helpers/utilities");
// messages constants
let messages = require("../../constants/messages");
const response = require("../../routes/schemas/common/response");
// const multer = require("multer");


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
      // return the response here
      return reply.send({ data: { ...response_payload } });
    } else {
      //create a user here and send out a OTP
      response_payload.already_registered = false;
      response_payload.user = await createUser(request, reply);
      //return the response
      return reply.send({ data: { ...response_payload } });
      
    }
  } catch (error) {
    // console.log(error);
<<<<<<< HEAD
    return reply.code(500).send({ error: { ...error } });
=======
    return reply.code(404).send({ error: { ...error } });
>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
  }
};



const createUser = async (request, reply) => {
  const new_user = {
    full_name: request.body.full_name,
    phone: request.body.phone,
    otp: utilites.GenerateOTP(),
  };
  if (request.body.phone==""){
<<<<<<< HEAD
    return reply.code(404).send({error: "field required"});
=======
    return reply.code(400).send({error: "field required"});
>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
  }
  try {
    const return_data = await user_model.create(new_user);
    return return_data;
  } catch (error) {
    console.log(error);
    return reply.code(422).send({ error: { ...error } });
  }
};

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
<<<<<<< HEAD
      full_name : request.body.full_name,
=======
      full_name : request.body.full_name, 
>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
      gender :request.body.gender,
      dob: request.body.dob,
      health_id: request.body.health_id,
    };
<<<<<<< HEAD
=======
    if (request.body.full_name|request.body.gender|request.body.dob==""){
      return reply.code(400).send({error: "field required"});
    }
>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
    const user = await user_model.update({ id: request.user.id }, update_document);
    if(user) {      
      const user_relative = await user_relative_model.findUnique(
        { phone: request.user.phone }
      )
    }
    // return the response here
    return reply.send({ data: { user } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

<<<<<<< HEAD
=======

>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
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
<<<<<<< HEAD
=======
      if (request.body.full_name|request.body.phone|request.body.dob|request.body.gender==""){
        return reply.code(400).send({error: "field required"});
      }
>>>>>>> 39b1ae252d1f024d6e8dd9212777a72f52ca9536
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
  
// FETCH All Added member DETAILS
const get_member_details = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findMany({
      where: {
        userId: request.user.id,
      },
    })
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// FETCH All Added member Perticular member list
const get_member = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findUnique({ id: request.user.id},{
      where: {
        userId: request.userId,
      },
    })
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

//Fetch Added members by user

const get_all_member_details = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findMany(request.body);
      // where: {
      //   userId: request.user.id,
      // },
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// FETCH USER DETAILS
const user = async(request, reply) => {
  try {
    const user_data = await user_model.findMany(request.body);
    reply.send({ data: user_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

module.exports = {
  mobile_login,
  verify_through_otp,
  update_User,
  get_member_details,
  get_member,
  add_members,
  get_all_member_details,
  user,
};
