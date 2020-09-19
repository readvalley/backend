import jwt from 'jsonwebtoken';
import config from '../config';

export default async (token: string) => {
  const { identity }: any = await jwt.verify(
    token,
    config.jwtSecret as string,
  );
  return identity;
};
