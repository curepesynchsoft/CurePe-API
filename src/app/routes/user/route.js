const controller = require("../../controllers/Auth/user.auth");
const schema = require("../user/schema");

/**
 * Auth routes endpoints
 */
module.exports = function (fastify, opts, done) {

  fastify.post("/mobile-login", {
    schema: schema.mobile_login,
    handler: controller.mobile_login,
  });

  //varify otp
  fastify.post("/verify-otp", {
    schema: schema.verify_otp,
    handler: controller.verify_through_otp,
  });

  //Route for User create
 
  fastify.post("/update_user",{
    onRequest: [fastify.authenticate],
    schema:schema.update,
    handler: controller.update_User
  });

  fastify.post("/add_members",{    
    onRequest: [fastify.authenticate],
    schema:schema.add_member,
    handler: controller.add_members
  });

  fastify.get("/users", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    schema: schema.retrieve,
    handler: controller.get_user,
  });
  
  done();
};
