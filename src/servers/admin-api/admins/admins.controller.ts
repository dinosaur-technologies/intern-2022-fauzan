import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from "@interfaces/express.interface";

import {
  Controller,
  Delete,
  Next,
  Params,
  Post,
  Put,
  Request,
  Response,
} from "@decorators/express";
import { Logger } from "@providers/logger.provider";
import { validate } from "@utils/validate.util";
import { SignUpDto, ResetPassDto } from "@servers/admin-api/admins/admin.dto";
import { services } from "@services/index.service";

@Controller("/admins")
export class AdminsController {
  private readonly logger = Logger("AdminsController");

  @Post("/")
  async create(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<SignUpDto>(SignUpDto, request.body);
      const account = await services.admins.signup(request.body);
      return response.status(201).json({ account });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Post("/signin")
  async authentication(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const accountAuth = await services.admins.signin(request.body);
      return response.status(201).json({ accountAuth });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Put("/password-reset")
  async update(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const body = await validate<ResetPassDto>(ResetPassDto, request.body);
      const updatePassword = await services.admins.resetPassword(request.body);
      return response.status(200).json({ message: "Reset password success" });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }

  @Delete("/:ID")
  async delete(
    @Params("ID") ID: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      const { ID } = request.params;
      const deleteAdmin = await services.admins.deleteAdmin({ id: Number(ID) });
      return response.sendStatus(204);
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
