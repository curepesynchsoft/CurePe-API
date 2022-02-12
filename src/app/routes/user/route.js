const controller = require("../../controllers/Auth/user.auth");
const schema = require("../user/schema");

/**
 * Auth routes endpoints
 */
module.exports = function (fastify, opts, done) {
  fastify.get("/users", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    schema: schema.retrieve,
    handler: controller.get_user,
  });
  
  done();
};
