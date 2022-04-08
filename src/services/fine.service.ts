import {
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import { ChargeFine, SearchFine, DeleteFine } from "@interfaces/fine.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class LoanService {
  private readonly logger = Logger("LoanService");

  async chargeFine(params: { data: ChargeFine }) {
    const newFine = await repositories.fines.create(params);

    if (!newFine) {
      throw new ConflictException("Request could not be processed");
    }

    return newFine;
  }

  async searchFine(params: SearchFine) {
    const { userId } = params;
    const existingFine = await repositories.fines.findByUserId(userId);

    if (!existingFine) {
      throw new NotFoundException("Existing fines not found");
    }

    return existingFine;
  }

  async deleteFine(params: DeleteFine) {
    const { id } = params;
    const existingFine = await repositories.fines.deleteById(id);

    if (!existingFine) {
      throw new NotFoundException("Existing fines not found");
    }

    return existingFine;
  }
}
