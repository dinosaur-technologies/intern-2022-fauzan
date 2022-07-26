import { Middleware } from '@decorators/express';
import { UnauthorizedException } from '@exceptions/http-exception';
import { repositories } from '@repositories/index.repository';
import { services } from '@services/index.service';
import { NextFunction, Request, Response } from 'express';

export class IsAuthenticatedAdmin implements Middleware {
  public async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.account) {
      return next(new UnauthorizedException('Invalid Credentials'));
    }

    const account = await repositories.admins.findOnebyId(req.session.account.id);

    if (!account) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    next();
  }
}
