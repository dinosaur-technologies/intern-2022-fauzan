import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  SigninParams,
  SignupParams,
  ResetParams,
} from "@interfaces/user.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";
import {hashSync, compare} from "bcryptjs";

export class UserService {
  private readonly logger = Logger("UserService");

  async signin(params: SigninParams) {
    const { email, password } = params;
    const existing = await repositories.users.findOneByEmail(email);

    if (!existing) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const validPassword = await compare(password, existing.password);

    if (!validPassword) {
      throw new UnauthorizedException("Invalid Password");
    }
    return existing;
  }

  async signup(params: SignupParams) {
    const { email, username, phoneNumber, password } = params;
    const hash = hashSync(password);

    const newUser = await repositories.users.create({
      data: {
        email,
        username,
        phoneNumber,
        password: hash,
      },
    });

    if (!newUser) {
      throw new ConflictException("Signup error because of conflict in request");
    }

    return newUser;
  }

  async resetPassword(params: ResetParams) {
    const { email, newPassword} = params;
    const existing = await repositories.users.findOneByEmail(email);

    if (!existing) {
      throw new NotFoundException("Email Not Registered");
    }

    const hash = hashSync(newPassword);
    
    const pass = await repositories.users.updateByEmail({
      data: {password: hash,},
      where: { email },
    });
  }
}
