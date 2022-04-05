import { UnauthorizedException } from '@exceptions/http-exception';
import { SigninParams } from '@interfaces/admin.interface';
import { Logger } from '@providers/logger.provider';
import { repositories } from '@repositories/index.repository';

export class AdminService {
  private readonly logger = Logger('AdminService');

  async signin(params: SigninParams) {
    const { email, password } = params;

    const existing = await repositories.admins.findOneByEmail(email);

    if (!existing) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // TODO: Compare password hash

    return existing;
  }
}
