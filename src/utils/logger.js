const now = () => Date.now();

const configureLogging = async (server) => {
  // setup request logging
  server.addHook('onRequest', (req, reply, done) => {
    reply.startTime = now();
    req.log.info({
      url: req.raw.url,
    }, 'received request');
    done();
  });

  // setup response response
  server.addHook('onResponse', (req, reply, done) => {
    req.log.info({
      url: req.raw.url,
      statusCode: reply.raw.statusCode,
      durationMs: now() - reply.startTime,
    }, 'request completed');
    done();
  });
};

export default configureLogging;