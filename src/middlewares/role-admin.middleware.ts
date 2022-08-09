import { Middleware } from '@decorators/express';
import { UnauthorizedException } from '@exceptions/http-exception';
import { repositories } from '@repositories/index.repository';
import { NextFunction, Request, Response } from 'express';

export class IsAdminRole implements Middleware {
  public async use(req: Request, res: Response, next: NextFunction) {
    const account = await repositories.admins.findOnebyId(req.session.account.id);

    if (!account) {
      return next(new UnauthorizedException('Admin account not found'));
    }

    next();
  }
}
