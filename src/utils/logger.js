import prettyHrTime from "pretty-hrtime";

const configureLogging = async (server) => {
  // setup request logging
  server.addHook("onRequest", (req, reply, done) => {
    reply.startTime = process.hrtime();

    req.log.info(
      {
        url: req.raw.url,
      },
      "received request"
    );
    done();
  });

  // setup response response
  server.addHook("onResponse", (req, reply, done) => {
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

export default configureLogging;
