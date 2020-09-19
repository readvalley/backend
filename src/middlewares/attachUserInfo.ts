import { NextFunction, Request, Response } from 'express';
import verifyToken from '../utils/verifyToken';

const attachUserInfo = (req: Request, res: Response, next: NextFunction) => {
  if (!req.token) {
    return next();
  }
  const { token } = req;
  try {
    const identity = verifyToken(token);
    req.app.set('user', identity);
    return next();
  } catch (err) {
    return res.status(403).json({
      error: 'token is invalid',
    });
  }
};

export default attachUserInfo;
