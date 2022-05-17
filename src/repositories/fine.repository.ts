import { PrismaClient, Prisma, Fine } from '@prisma/client';
const prisma = new PrismaClient();

export class FinesRepository {
  async create(params: Prisma.FineCreateArgs) {
    return prisma.fine.create(params);
  }

  async deleteById(id: number) {
    return prisma.fine.delete({ where: { id } });
  }

  async count(loanId: number) {
    return prisma.fine.count({ where: { loanId } });
  }

  async findByLoanId(params: { loanId: number; skip: number; take: number }) {
    const { loanId, skip, take } = params;
    return prisma.fine.findMany({
      skip,
      take,
      where: { loanId },
    });
  }
}
