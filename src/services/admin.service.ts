import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  SigninParams,
  SignupParams,
  ResetParams,
  DeleteAdminParams,
} from "@interfaces/admin.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";
import bcrypt from "bcryptjs";

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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newAdmin = await repositories.admins.create({
      data: {
        email,
        username,
        password: hash,
      },
    });

    if (!newAdmin) {
      throw new ConflictException("Signup error because of conflict in request");
    }

    return newAdmin;
  }

  async resetPassword(params: ResetParams) {
    const { email, newPassword} = params;
    const existing = await repositories.admins.findOneByEmail(email);

    if (!existing) {
      throw new NotFoundException("Email Not Registered");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    
    const updating = await repositories.admins.updateByEmail({
      data: {password: hash,},
      where: { email },
    });
  }

  async deleteAdmin(params: DeleteAdminParams) {
    const { id } = params;
    const deleteBook = await repositories.admins.deleteById(id)
    
    return deleteBook;
  }
}
