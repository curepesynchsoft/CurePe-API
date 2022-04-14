const { BearerTokenMiddleware } = require('../middlewares/bearer_token');

//initial route (/)
// const initial_route = require("./initial/route");

const user_route = require("./user/route");

const admin_route = require("./admin/route");

module.exports = function (app, opts, done) {
  
  // app.register(initial_route);
  //app is fastify here
  app.register(user_route,{ prefix: process.env.API_ROUTE });
  app.register(admin_route,{ prefix: process.env.API_ROUTE });

  done();
};
