import fastify from "fastify";
import { generate as generateComb } from "ordered-uuid-v4";
import initLogger from "./lib/logger";
import initRoutes from './routes';
import loadConfig from "./lib/config";

loadConfig();

export const createServer = async () => {
  const server = fastify({
    logger: {
      level: process.env.LOG_LEVEL,
    },
    genReqId(req) {
      return generateComb();
    },
    disableRequestLogging: true,
    requestIdHeader: process.env.TRACE_ID_HEADER,
  });

  await initLogger(server);
  await initRoutes(server);  
  await server.ready();
  
  return server;
};

export const startServer = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });

  const server = await createServer();
  await server.listen(+process.env.SERVER_PORT, process.env.SERVER_HOST);

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () =>
      server.close().then((err) => {
        console.log(`Closing server on ${signal}`);
        process.exit(err ? 1 : 0);
      })
    );
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}
