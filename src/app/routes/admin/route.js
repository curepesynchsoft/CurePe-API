const controller = require("../../controllers/Auth/admin.auth");
const schema = require("../admin/schema");

module.exports = function (fastify, opts, done) {


    //Admin login
  fastify.post("/admin-login", {
    schema: schema.admin_login,
    handler: controller.admin_login,
  });

  // varify otp
  fastify.post("/admin-verify-otp", {
    schema: schema.verify_admin_otp,
    handler: controller.verify_through_otp,
  });

  //Update Admin
  fastify.post("/update_admin",{
    onRequest: [fastify.authenticate],
    schema:schema.update,
    handler: controller.update_Admin,
  });
    //Get User List
  fastify.get("/admin", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.admin,
  });

  // fastify.post('/update-details', {
  //   schema: schema.
  // })
  done();
}
