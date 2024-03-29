const { use } = require("bcrypt/promises");
// const HttpStatusCode = require('http-status-codes/index')
// const { PrismaClient } = require('@prisma/client')
// import Model from the models directory
// const prisma = new PrismaClient()
const user_model = require("../../models/user.model");
const report_model = require("../../models/report.model");
const user_relative_model = require("../../models/userRelative.model");
const media_model = require("../../models/media.model");
// importing the utilities plugin for extra jobs
let utilites = require("../../common-helpers/utilities");
// messages constants
let messages = require("../../constants/messages");
const response = require("../../routes/schemas/common/response");
const multer = require("fastify-multer");
// const Tesseract= require('tesseract.js');
// Mobile login with OTP
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
          set: new_otp
        }
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
    return reply.code(500).send({ error: { ...error } });
  }
};
const createUser = async (request, reply) => {
  const new_user = {
    full_name: request.body.full_name,
    phone: request.body.phone,
    otp: utilites.GenerateOTP()
  };
  if (request.body.phone == "") {
    return reply.code(404).send({ error: "field required" });
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
    const user = await user_model.findUnique({ phone: request.body.phone });
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
      full_name: request.body.full_name,
      gender: request.body.gender,
      dob: request.body.dob,
      health_id: request.body.health_id
    };
    const user = await user_model.update(
      { id: request.user.id },
      update_document
    );
    if (user) {
      const user_relative = await user_relative_model.findUnique({
        phone: request.user.phone
      });
    }
    // return the response here
    return reply.send({ data: { user } });
  } catch (error) {
    return reply.code(400).send({ error: { ...error } });
  }
};
// add relatives
const add_members = async (request, reply) => {
  let response = [];
  try {
    const return_data = await user_model.findUnique({ id: request.user.id });
    if (return_data) {
      const new_member = {
        userId: request.user.id,
        full_name: request.body.full_name,
        phone: request.body.phone,
        gender: request.body.gender,
        dob: request.body.dob,
        relation: request.body.relation,
        health_id: request.body.health_id
      };
      // Required fields
      if (
        request.body.full_name == "" &&
        request.body.phone == "" &&
        request.body.dob == "" &&
        request.body.gender == "" &&
        request.body.relation == ""
      ) {
        return reply.code(400).send({ error: "field required" });
      }
      response.add_members = await user_relative_model.create(new_member);
      if (response.add_members) {
        response.user = await createUser(request, reply);
      }
      return reply.send({ data: { ...response } });
    }
  } catch (error) {
    return reply.code(404).send({ error: { ...error } });
  }
};
// FETCH All Added member DETAILS
const get_member_details = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findMany({
      // where: {
      //   userId: request.user.id,
      // },
    });
    reply.send({ data: { return_data } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
// FETCH All Added member Perticular member list
const per_member_details = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findMany({
      where: {
        userId: request.user.id
      }
    });
    // console.log({ data: return_data });
    reply.send({ data: { return_data } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
// FETCH All Added member Perticular member list
const get_member = async (request, reply) => {
  // run a model
  try {
    const return_data = await user_relative_model.findUnique(
      { id: request.user.id },
      {
        where: {
          userId: request.userId
        }
      }
    );
    reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
//Fetch all Added members by user
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
const user = async (request, reply) => {
  try {
    const user_data = await user_model.findMany(request.body);
    reply.send({ data: user_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
const user_details = async (request, reply) => {
  try {
    const user_data = await user_model.findUnique({ id: request.user.id });
    reply.send({ data: user_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};
// Upload user profile
const upload_media = async (request, reply) => {
  report = [];

  console.log(request.file);
  // run a model
  const fileName = request.file.filename;
  const filePath = request.file.path;
  const type = request.query.media_type;
  const reference_id = request.query.reference_id;

  const image_type = request.query.image_type ?? "No Image Type Specified";

  // try {
  const media = {
    reference_id: reference_id,
    type: type,
    media_type: type,
    path: filePath
  };
  report.upload_media = await media_model.create(media);
  // return report

  reply.send({ data: { media } });

  if (media.type === "profile") {
    await user_model.update(
      { id: reference_id },
      {
        image: filePath
      }
    );
  }
  // } catch (error) {
  //   console.log(error);
  //   return reply.code(422).send({ error: { ...error } });
  // }
};
const upload_report = async (request, reply) => {
  // console.log(request.file);
  // run a model
  const filetype = request.body.filetype;
  const filePath = request.file.path;
  const type = request.query.media_type;
  const reference_id = request.query.reference_id;
  const type_ins = request.body.type_ins;
  const relation = request.body.relation
  // const image_type = request.query.image_type ?? "No Image Type Specified";

  try {
    const media = await report_model.create({
      reference_id: reference_id,
      type: type,
      media_type: type,
      path: filePath,
      type_ins: type_ins,
      relation:relation,
      filetype: filetype
    });
    reply.send({ data: { media } });
    if (type === "report") {
      await user_model.update(
        { id: reference_id },
        {
          report: filePath
        }
      );
    }
    reply.send({ data: { media } });
  } catch (error) {
    console.log(error);
    return reply.code(422).send({ error: { ...error } });
  }
};

const get_reports = async (request, reply) => {
  // run a model
  try {
    const return_data = await report_model.findMany({
      where: {
        reference_id: request.user.id
      }
    });
    // console.log({ data: return_data });
    reply.send({ data: { return_data } });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// const delete_report = async (request, reply) => {
//   const id = request.body.id;
//   const return_dat = await report_model.findMany({
//     where: {
//       reference_id:request.user.id,
//     },
//   })
// }
const delete_report = async (request, reply) => {
  try {
    const id = request.params;
    const delete_plcy = await report_model.remove({
      where: { id: request.body.id }
    });
    return reply.send({ data: delete_plcy });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

const delete_member = async (request, reply) => {
  try {
    const dlt_mem = await user_relative_model.remove({
      where: {
        id: request.body.id
      }
    });
    return reply.send({ data: dlt_mem });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

const edit_mem = async (request, reply) => {
 try {
   const { id } = request.params;
   const update_document = {
     full_name: request.body.full_name,
     phone: request.body.phone,
     gender: request.body.gender,
     dob: request.body.dob,
     relation: request.body.relation,
     health_id: request.body.health_id
     //  userId: request.body.userId,
     //  mobile: request.body.mobile,
     //  amount: request.body.amount,
     //  paid: request.body.paid,
     //  enabled: request.body.enabled
   };
   console.log(update_document);
   const user = await user_relative_model.update(
     {
       id: Number(id)
     },
     update_document
  );
  console.log(user);


   // return the response here
   return reply.send({ data: user });
 } catch (error) {
   return reply.code(400).send({ error: { ...error } });
 }
};

const extract = async (request, reply) => {
  // const rep = request.body.path
  // const extra = await report_model.findMany(
  tesseract
    .recognize("https://tesseract.projectnaptha.com/img/eng_bw.png", "eng", {
      logger: (m) => console.log(m)
    })
    .then(({ data: { text } }) => {
      console.log([text.split(" ").join(",")]);
    });
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
  user_details,
  upload_media,
  upload_report,
  per_member_details,
  get_reports,
  delete_report,
  extract,
  delete_member,
  edit_mem
};
