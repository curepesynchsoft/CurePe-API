"use strict";

const fastify = require("fastify");
const cors = require("fastify-cors");
const swagger = require("fastify-swagger");
const autoload = require("fastify-autoload");
const routes = require("./app/routes/routes");
const { v4: uuid } = require("uuid");
const path = require("path");

const informational_constant = require("./app/constants/informational");
// implement hooks if we want to track the Incoming Requests somewhere.

//Activating Plugins

const swagger_configuration = () => {
  return {
    routePrefix: "/api-documentation",
    swagger: {
      info: {
        title: "Fastify Playground",
        description:
          "Custom made Fastify based Playground for getting API running smoothly",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: true,
  };
};

const init = async () => {
  const app = fastify({
    logger: true,
    genReqId: (req) => req.headers["x-request-id"] || uuid(),
  });
  app.register(cors);
  app.register(swagger, swagger_configuration());
  app.register(require("fastify-jwt"), {
    secret: process.env.APP_KEY,
  });
  app.register(autoload, {
    dir: path.join(__dirname, "plugins"),
    ignorePattern: /^(__tests__)/,
  });
  app.register(routes);
  

  // if we want to add hooks
  //app.addHook('function_name', function(){});
  await app.ready();
  //return the app
  return app;
};

const run = (app) =>
  app.listen(process.env.PORT, process.env.HOST, function (err, address) {
    if (err) {
      console.log(informational_constant.SERVER_OFFLINE);

      console.log(err)
      
      app.log.error(err);
      process.exit(1);
    }
    global.app=app;
    // global app for fastify
    console.group("fastify-initilization ⚡");
    console.warn("Server is now listening on", address);
    console.groupEnd("fastify-initilization");
    app.ready(err => {
      if (err) throw err
      app.swagger()
    })
  });

module.exports = { init, run };
