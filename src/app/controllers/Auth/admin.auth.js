const { use } = require("bcrypt/promises");
const HttpStatusCode = require("http-status-codes/index");
// import Model from the models directory
const admin_model = require("../../models/admin.model");
const subadmin_model = require("../../models/subadmin.model");
const user_relative_model = require("../../models/userRelative.model");
const user_model = require("../../models/user.model");
// importing the utilities plugin for extra jobs
let utilites = require("../../common-helpers/utilities");
// messages constants
let messages = require("../../constants/messages");
const response = require("../../routes/schemas/common/response");

const admin_login = async (request, reply) => {
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
      full_name: request.body.full_name,
      phone: request.body.phone

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

const admin = async (request, reply) => {
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
const per_member_details = async (request, reply) => {
  // run a model
  try {
    // userId: request.body.userId;
    const { userId } = request.params;
    const return_data = await user_relative_model.findMany({
      where: {
        userId: Number(userId
        )
      }
      // where: {
      //   userId: request.query.userId,
      // },
    })
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
const user_details = async (request, reply) => {
  // run a model
  try {
    // userId: request.body.userId;
    const { id } = request.params;
    const return_data = await user_model.findMany({
      where: {
        id: Number(id
        )
      }

    })
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

const policies = async (request, reply) => {
  let response = []
  //try {
  const new_policy = {
    userId: request.body.userId,
    mobile: request.body.mobile,
    amount: request.body.amount,
    paid: request.body.paid,
    enabled: request.body.enabled,
    status: request.body.status,
  };
  //Required fields
  response.policies = await subadmin_model.create(new_policy)
  return reply.send({ data: { ...response } });
};

const getpolicies = async (request, reply) => {
  try {
    const user_data = await subadmin_model.findMany(request.body);
    reply.send({ data: user_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
// const update_policy = async (request, reply) => {
//   const { id } = request.params
//   const userr = await subadmin_model.update({
//     where: {
//       id :Number(id)
//     }
//     }, {
//     userId: request.body.userId,
//     mobile: request.body.mobile,
//     paid: request.body.paid,
//     enabled: request.body.enabled
//   });
//   console.log(userr);
//   // return the response here
//   return reply.send({ data: userr });
//   // } catch (error) {
//   //   return reply.code(400).send({ error: { ...error } });
//   // }
// };
const update_policy = async (request, reply) => {
  try {
    const { id } = request.params;
    const update_document = {
      userId: request.body.userId,
      mobile: request.body.mobile,
      amount: request.body.amount,
      paid: request.body.paid,
      enabled: request.body.enabled
    };
    console.log(update_document);
    const user = await subadmin_model.update({ 
      id: Number(id)
    }, update_document);
    
    // return the response here
    return reply.send({ data:  user  });
  } catch (error) {
    return reply.code(400).send({ error: { ...error } });
  }
};
const delete_policy = async (request, reply)=>{
  const { id } = request.params;
  const delete_plcy= await subadmin_model.remove(
    { where: { id: Number(id) } }
  );
  return reply.send({ data: delete_plcy })
}

// const enable = async (request, reply) => {
//   const { id } = request.params;
//   const status= request.body.status;
//   const post = await subadmin_model.update({
//     where: { id }, status
//     // data: { published: true },
//   })
//   res.json(post)
// }

const enabled_policy = async (request, reply) => {
  try {
    const { id } = request.params;
    const enable = await subadmin_model.update({ id: Number(id) }, { status: 'enabled' });
    // return the response here
    return reply.send({ data: { enable } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  } 
};

const disable_policy = async (request, reply) => {
  try {
    const { id } = request.params;
    const enable = await subadmin_model.update({ id: Number(id) }, { status: 'disabled' });
    // return the response here
    return reply.send({ data: { enable } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};


const add_members = async (request, reply) => {
  let response = []
  try {
    const new_member = {
      userId: request.body.userId,
      full_name: request.body.full_name,
      phone: request.body.phone,
      gender: request.body.gender,
      dob: request.body.dob,
      relation: request.body.relation,
      health_id: request.body.health_id,
    };
    // Required fields
    if (request.body.full_name == "" && request.body.phone == "" && request.body.dob == "" && request.body.gender == "" && request.body.relation == "") {
      return reply.code(400).send({ error: "field required" });
    }
    response.add_members = await user_relative_model.create(new_member)
    return reply.send({ data: { ...response } });
    
  } catch (error) {
    return reply.code(404).send({ error: { ...error } });
  }
};

const delete_member = async (request, reply) => {
  const { id } = request.params;
  const delete_plcy = await user_relative_model.remove(
    { where: { id: Number(id) } }
  );
  return reply.send({ data: delete_plcy })
}



module.exports = {
  admin_login,
  verify_through_otp,
  admin,
  update_admin,
  add_subadmin,
  per_member_details,
  user_details,
  policies,
  getpolicies,
  update_policy,
  delete_policy,
  enabled_policy,
  disable_policy,
  add_members,
  delete_member
}
