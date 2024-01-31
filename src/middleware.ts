import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './config';

let users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 1, username: 'user', password: '123' },
];

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function generateToken(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  }
}
