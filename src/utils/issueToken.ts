import jwt from 'jsonwebtoken';
import { UserDoc } from '../models/User';

import config from '../config';

export default async (identity: UserDoc, refresh: boolean) => {
  if (!refresh) {
    const token = await jwt.sign({ identity }, config.jwtSecret as string, {
      algorithm: 'HS256',
    });
    return token;
  }
  const token = await jwt.sign(
    {
      _id: identity._id,
      refresh: true,
    },
    config.jwtSecret as string,
  );
  console.log(token);
  return token;
};
