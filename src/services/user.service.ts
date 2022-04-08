import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  SigninParams,
  SignupParams,
  Recover,
} from "@interfaces/user.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";
const bcrypt = require("bcrypt");

export class UserService {
  private readonly logger = Logger("UserService");

  async signin(params: SigninParams) {
    const { email, password } = params;
    const existing = await repositories.users.findOneByEmail(email);

    if (!existing) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const validPassword = await bcrypt.compare(password, existing.password);

    if (!validPassword) {
      throw new UnauthorizedException("Invalid Password");
    }
    return existing;
  }

  async signup(params: SignupParams) {
    const { email, username, phoneNumber, password } = params;
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = await repositories.users.create({
      data: {
        email,
        username,
        phoneNumber,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new ConflictException("Email already in used");
    }

    return newUser;
  }

  async recover(params: Recover) {
    const { email } = params;

    const existing = await repositories.users.findOneByEmail(email);

    if (!existing) {
      throw new NotFoundException("Email Not Registered");
    }

    return existing.password;
  }
}
