import { PrismaClient, Prisma, Loan } from '@prisma/client';
const prisma = new PrismaClient();

export class LoansRepository {
  async create(bookId: number, userId: number, startDate: string) {
    const newLoan = await prisma.loan.create({
      data: {
        bookId,
        userId,
        startDate,
      },
    });
    console.log('New loan: ');
    console.log(newLoan);
  }

  async findByUserId(userId: number) {
    const findLoan = await prisma.loan.findMany({
      where: {
        userId,
      },
    });
    console.log('The loan query: ');
    console.log(findLoan);
  }

  async deleteById(id: number) {
    const deleteLoan = await prisma.loan.delete({
      where: {
        id,
      },
    });
    console.log('Delete Loan: ');
    console.log(deleteLoan);
  }
}
