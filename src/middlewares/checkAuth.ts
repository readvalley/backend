import { NextFunction, Request, Response } from 'express';
import verifyToken from '../utils/verifyToken';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.token) {
    return res.status(403).json({
      error: 'token is missing',
    });
  }
  const { token } = req;
  try {
    verifyToken(token);
    return next();
  } catch (err) {
    return res.status(403).json({
      error: 'token is invalid',
    });
  }
};

export default checkAuth;
