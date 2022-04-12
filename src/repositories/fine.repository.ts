import { PrismaClient, Prisma, Fine } from '@prisma/client';
const prisma = new PrismaClient();

export class FinesRepository {
  async create(params: Prisma.FineCreateArgs) {
    return prisma.fine.create(params);
  }

  async deleteById(id: number) {
    return prisma.fine.delete({ where: { id } });
  }

  async findByLoanId(loanId: number) {
    return prisma.fine.findMany({ where: { loanId } });
  }
}
