import { PrismaClient, Prisma, Loan } from '@prisma/client';
const prisma = new PrismaClient();

export class LoansRepository {
  async create(params: Prisma.LoanCreateArgs) {
    return prisma.loan.create(params);
  }

  async findByUserId(params: { userId: number; skip: number; take: number }) {
    const { userId, skip, take } = params;
    return prisma.loan.findMany({
      skip,
      take,
      where: { userId },
    });
  }

  async deleteById(id: number) {
    return prisma.loan.delete({ where: { id } });
  }

  async count(userId: number) {
    return prisma.loan.count({ where: { userId } });
  }
}
