
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

  // varify otp
  fastify.post("/verify-otp", {
    schema: schema.verify_otp,
    handler: controller.verify_through_otp,
  });

  // Route for User update
  fastify.post("/update_user",{
    onRequest: [fastify.authenticate],
    schema:schema.update,
    handler: controller.update_User
  });

  // Route for Add relatives 
  fastify.post("/add_members",{    
    onRequest: [fastify.authenticate],
    schema:schema.add_member,
    handler: controller.add_members
  });

  // Get Added member list

  fastify.get("/added_member_list", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.retrieve_all_particular_members,
    handler: controller.get_member_details,
  });

  fastify.get("/added_member", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.all_particular_members,
    handler: controller.per_member_details,
  
  });
  // Get All Added member list
  fastify.get("/added_all_member_list", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    // onRequest: [fastify.authenticate],
    schema: schema.retrieve_all_members,
    handler: controller.get_all_member_details,
  });

  // Get User List
  fastify.get("/user", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve,
    handler: controller.user,
  });
  fastify.get("/user_details", {
    onRequest: [fastify.authenticate],
    schema: schema.retrieve_user,
    handler: controller.user_details,
  });

  // upload user profile
  // fastify.post(
  //   "/media",
  //   {
  //     schema: schema.uploads,
  //     onRequest: [fastify.authenticate],
  //     preHandler: fastify.uploader.single("file"),
  //   },
  //   controller.upload_media
  // );
  fastify.post(
    "/media",
    {
      schema: schema.uploads,
      onRequest: [fastify.authenticate],
      preHandler: fastify.uploader.single("file"),
    },
    controller.upload_media
  );
  fastify.post(
    "/upload-report",
    {
      schema: schema.uploads_report,
      onRequest: [fastify.authenticate],
      preHandler: fastify.uploader.single("file"),
    },
    controller.upload_report
  );
  // get report data 
  fastify.get("/user-reports", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.retrieve_report,
    handler: controller.get_reports,
  });
  fastify.post("/delete-reports", {
    // add onRequest: [fastify.authenticate], if you want to add and prootect the api endpoint
    onRequest: [fastify.authenticate],
    schema: schema.delete_report,
    handler: controller.delete_report,
  });
  fastify.post('/pdfextract', {
    schema: schema.reportt,
    handler: controller.extract
  });
  done();

};