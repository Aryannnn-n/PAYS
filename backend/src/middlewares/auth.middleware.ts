import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
    }
  }
}

interface AuthJwtPayload extends JwtPayload {
  userId: string | number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not defined');
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string' || !('userId' in decoded)) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.userId = (decoded as AuthJwtPayload).userId;

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export { authMiddleware };
