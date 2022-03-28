const controller = require("../../controllers/Auth/user.auth");
const schema = require("../user/schema");

/**
 * Auth routes endpoints
 */
module.exports = function (fastify, opts, done) {

  // generate OTP 

  fastify.post("/mobile-login", {
    schema: schema.mobile_login,
    handler: controller.mobile_login,
  });

  //varify otp
  fastify.post("/verify-otp", {
    schema: schema.verify_otp,
    handler: controller.verify_through_otp,
  });

  //Route for User update
 
  fastify.post("/update_user",{
    onRequest: [fastify.authenticate],
    schema:schema.update,
    handler: controller.update_User
  });

  // Add relatives 
  fastify.post("/add_members",{    
    onRequest: [fastify.authenticate],
    schema:schema.add_member,
    handler: controller.add_members
  });

  //Get Added member list
  fastify.get("/All_added_member_list", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.get_all_member_details,
  });

  fastify.get("/added_member_list", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.get_member_details,
  });
  fastify.get("/perticular_member_list", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.get_member,
  });


  //Get User List
  fastify.get("/user", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.user,
  });
  
  done();
};
