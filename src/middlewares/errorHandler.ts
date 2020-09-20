import { Request, Response } from 'express';

const errorHandler = (
  _: Request,
  res: Response,
) => {
  return res.status(500).json({ error: 'Server error' });
};

export default errorHandler;
