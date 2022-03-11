import initUserRoutes from './user';

const initRoutes = async (server) => {
  initUserRoutes(server);  
};

export default initRoutes;
