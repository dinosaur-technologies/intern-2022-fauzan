import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  SigninParams,
  SignupParams,
  Recover,
} from "@interfaces/admin.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";
const bcrypt = require("bcrypt");

export class AdminService {
  private readonly logger = Logger("AdminService");

  async signin(params: SigninParams) {
    const { email, password } = params;
    const existing = await repositories.admins.findOneByEmail(email);
    
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
    const { email, username, password } = params;
    const hashedPassword = bcrypt.hash(password, 10);
    const newAdmin = await repositories.admins.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    if (!newAdmin) {
      throw new ConflictException("Email already in used");
    }

    return newAdmin;
  }

  async recover(params: Recover) {
    const { email } = params;

    const existing = await repositories.admins.findOneByEmail(email);

    if (!existing) {
      throw new NotFoundException("Email Not Registered");
    }

    return existing.password;
  }
}
