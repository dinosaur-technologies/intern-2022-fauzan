import { PrismaClient, Prisma, Loan } from '@prisma/client';
const prisma = new PrismaClient();

export class LoansRepository {
  async create(params: Prisma.LoanCreateArgs) {
    return prisma.loan.create(params);
  }

  async findByUserId(userId: number) {
    return prisma.loan.findMany({ where: { userId } });
  }

  async deleteById(id: number) {
    return prisma.loan.delete({ where: { id } });
  }
}
