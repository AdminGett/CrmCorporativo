import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  role: number;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Ha ocurrido un errorsllo' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'pacoeltaco') as JwtPayload;

    if (decoded.role !== 1) {
      res.status(403).json({ message: 'Acceso denegadote.'});
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Ocurrio un errorsito' });
    return;
  }
};