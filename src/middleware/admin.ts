import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    const user = req.user;

    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }
  }
}
