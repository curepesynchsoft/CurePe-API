const controller = require("../../controllers/Auth/user.auth");
const schema = require("../user/schema");

/**
 * Auth routes endpoints
 */
module.exports = function (fastify, opts, done) {

  //Route for User create
  fastify.post("/register",{
    schema: schema.create,
    handler: controller.create_user
  });

  fastify.post("/login",{
    schema: schema.login,
    handler: controller.login_user
  });

  fastify.get("/users", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    schema: schema.retrieve,
    handler: controller.get_user,
  });
  
  done();
};
