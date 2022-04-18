import {
  ConflictException,
  NotFoundException,
} from "@exceptions/http-exception";
import {
  ChargeFineParams,
  SearchFineParams,
  DeleteFineParams,
} from "@interfaces/fine.interface";
import { Logger } from "@providers/logger.provider";
import { repositories } from "@repositories/index.repository";

export class FineService {
  private readonly logger = Logger("FineService");

  async chargeFine(params: ChargeFineParams ) {
    const newFine = await repositories.fines.create({data : params});

    if (!newFine) {
      throw new ConflictException("Request could not be processed");
    }

    return newFine;
  }

  async searchFine(params: SearchFineParams) {
    const { loanId } = params;
    const existingFine = await repositories.fines.findByLoanId(loanId);

    if (!existingFine) {
      throw new NotFoundException("Existing fines not found");
    }

    return existingFine;
  }

  async deleteFine(params: DeleteFineParams) {
    const { id } = params;
    const existingFine = await repositories.fines.deleteById(id);

    if (!existingFine) {
      throw new NotFoundException("Existing fines not found");
    }

    return existingFine;
  }
}
