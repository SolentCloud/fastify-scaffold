import Fastify from "fastify";
import crud from "fastify-crud-generator";
import { generate as generateComb } from "ordered-uuid-v4";
import configureLogging from "./utils/logger";
import usersController from "./Users/users-controller";

const REDACTED = "[*** Redacted ***]";
const REQUEST_ID_HEADER = "trace-id";

const fastify = Fastify({
  logger: {
    redact: {
      paths: ["headers.authorization"],
      remove: false,
      censor: REDACTED,
    },
    level: "info",
  },
  genReqId(req) {
    return generateComb();
  },
  disableRequestLogging: true,
  requestIdHeader: REQUEST_ID_HEADER,
});

configureLogging(fastify);

fastify.get("/debug-headers", async (req) => {
  req.log.info(
    { headers: req.headers },
    "Logging request headers for debugging..."
  );

  return { ok: true };
});

fastify
  .register(crud, {
    prefix: "/users",
    controller: usersController,
  })
  .after(() => console.log(fastify.printRoutes()));

const start = async () => {
  try {
    await fastify.listen(
      process.env.PORT || 4100,
      process.env.HOST || "localhost"
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
