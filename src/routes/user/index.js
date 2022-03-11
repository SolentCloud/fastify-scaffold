import userBodySchema from "../../schemas/user-body-schema.js";

const initUserRoutes = async (server) => {
  server.get("/user/:id", async (req, reply) => {
    console.log(req);
    return { userId: req.params.id };
  });

  server.post("/user", { userBodySchema }, async (req, reply) => {
    return { created: true };
  });
};

export default initUserRoutes;
