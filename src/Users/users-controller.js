import httpStatus from 'http-status';

const APPLICATION_JSON = 'application/json';

const usersInterface = {
  list: async (req, reply) => await listUsers(req, reply),
  create: async (req, reply) => await createUsers(req, reply),
  view: async (req, reply) => await viewUser(req, reply),
  update: async (req, reply) => await updateUser(req, reply),
  delete: async (req, reply) => await deleteUser(req, reply),
};

const listUsers = async(req, reply) => {
  reply.type(APPLICATION_JSON).code(httpStatus.OK);
  return { listUsers: [] };
};

const createUsers = async(req, reply) => {
  reply.type(APPLICATION_JSON).code(httpStatus.OK);
  return { createUsers: [] };
};

const viewUser = async(req, reply) => {
  reply.type(APPLICATION_JSON).code(httpStatus.OK);
  return { viewUser: {} };
};

const updateUser = async(req, reply) => {
  reply.type(APPLICATION_JSON).code(httpStatus.OK);
  return { updateUser: {} };
};

const deleteUser = async(req, reply) => {
  reply.type(APPLICATION_JSON).code(httpStatus.OK);
  return { deleteUser: {} };
};

export default usersInterface;