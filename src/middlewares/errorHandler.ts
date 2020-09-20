import { Request, Response } from 'express';

const errorHandler = () => (
  error: any,
  _: Request,
  res: Response,
) => {
  console.log(error, res);
  return res.status(500).json({ error: 'Server error' });
};

export default errorHandler;
