const HttpStatusCode = require("http-status-codes/index");
// import Model from the models directory
const user_model = require("../../models/user.model");


// Create User
const create_user = async (request, reply) => {
  // run a model
  try {
  const new_user = {
    full_name: request.body.full_name,
    email: request.body.email,
    dob: request.body.dob,
    passkey: request.body.passkey,
  }

  const return_data = await user_model.create(new_user);
  // console.log(return_data)
  return reply.send({ data: return_data });
  } catch (error) {
    return reply.code(422).send({ error: { ...error } });
  }
};

// Create User
const login_user = async (request, reply) => {
  // run a model
  try {
  const user = {
    email: request.body.email,
    passkey: request.body.passkey,
  }
  console.log(user)
  const return_data = await user_model.findUnique(
    {
      email: user.email,
    },
  );
  // console.log(return_data)
  return reply.send({ data: return_data });
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
  get_user,
  login_user,
};
