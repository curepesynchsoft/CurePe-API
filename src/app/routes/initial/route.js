const app_constants = require("../../constants/application");
const os = require('os');

const initial_schema = {
  description: "Initial Endpoint.",
  tags: ["Initial"],
  summary: "Initial Endpoint of blazing fast Fastify Server",
  response: {
    200: {
      description: "Continue with the Request",
      type: "object",
      properties: {
        status: { type: "boolean", default: false },
        message: { type: "string", default: app_constants.API_WELCOME_MESSAGE },
        data: { type: "object", default: {}, additionalProperties: true },
      },
    },
  },
};

module.exports = function (fastify, opts, done) {
  fastify.get("/", { schema: initial_schema }, async (request, reply) => {
    let payload = { 
        api_platform:os.platform(),
        api_load: os.loadavg(),
        free_memory:os.freemem(),
        total_memory:os.totalmem(),
        api_uptime:os.uptime(),
        route:process.env.API_ROUTE
    };
    return reply.send({ data: payload });
  });
  done();
};
