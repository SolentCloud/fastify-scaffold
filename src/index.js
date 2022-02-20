import Fastify from 'fastify';
import crud from 'fastify-crud-generator';
import usersController from './Users/users-controller';

const REDACTED = "[*** Redacted ***]";

const fastify = Fastify({
  logger: {
    redact: {
      paths: ["headers.authorization"],
      remove: true,
      censor: REDACTED,
    },
    level: "info",
  },
});

fastify.register(crud, {
  prefix: '/users',
  controller: usersController,
})
.after(() => console.log(fastify.printRoutes()));

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 4100, process.env.HOST || 'localhost');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();