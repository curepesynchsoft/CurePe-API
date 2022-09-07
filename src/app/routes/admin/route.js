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
  fastify.post("/update_admin", {
    onRequest: [fastify.authenticate],
    schema: schema.update,
    handler: controller.update_admin,
  });
  // Get User List
  fastify.get("/admin", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.admin,
  });
  fastify.post("/add_subadmin", {
    schema: schema.add_subadmin,
    handler: controller.add_subadmin,
  });
  fastify.get("/per-member/:userId", {
    // schema: schema.per_member,
    handler: controller.per_member_details,
  });

  fastify.get("/user_details/:id", {
    // schema: schema.per_member,
    handler: controller.user_details,
  });
  fastify.post("/policies_details", {
    schema: schema.policies_details,
    handler: controller.policies,
  });
  fastify.get("/policies_all", {
    handler: controller.getpolicies,
  });

  // Get User List
  fastify.get("/allpolicies", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.getpolicies,
  });

  fastify.patch("/update_policy/:id", {
    // onRequest: [fastify.authenticate],
    schema: schema.update_policy,
    handler: controller.update_policy
  });
  fastify.get("/delete_policy/:id", {
    schema: schema.delete_policy,
    handler: controller.delete_policy,
  });
  fastify.post("/enable-policy/:id", {
    // onRequest: [fastify.authenticate],
    schema: schema.update_enabled,
    handler: controller.enabled_policy
  });
  fastify.post("/disable-policy/:id", {
    // onRequest: [fastify.authenticate],
    schema: schema.update_disable,
    handler: controller.disable_policy
  });
  done();
}

