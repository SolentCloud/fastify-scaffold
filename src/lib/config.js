import { config as initConfig } from 'dotenv';
import path from 'path';

const loadConfig = () => {
  const result = initConfig({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV ?? 'development'}`),
  });

  if (result.error) {
    throw new Error(result.error);
  }
}

export default loadConfig;
