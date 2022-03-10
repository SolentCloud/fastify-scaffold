import prettyHrTime from "pretty-hrtime";

const initLogger = async (server) => {
  // setup request logging
  server.addHook("onRequest", async (req, reply) => {
    reply.startTime = process.hrtime();
    req.log.info({ url: req.raw.url }, "received request");
  });

  // setup response response
  server.addHook("onResponse", async (req, reply) => {
    const diff = process.hrtime(reply.startTime);

    req.log.info(
      {
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
        elapsedMs: hrtimeToMs(diff),
        elapsedPretty: prettyHrTime(diff, { precise: true }),
      },
      "request completed"
    );
    done();
  });
};

export const hrtimeToMs = (diff = []) => diff[0] * 1e3 + diff[1] * 1e-6;

export default initLogger;
