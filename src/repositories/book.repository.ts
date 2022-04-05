import { PrismaClient, Prisma, Book } from '@prisma/client';
const prisma = new PrismaClient();

export class BooksRepository {
  async create(params: Prisma.BookCreateArgs) {
    return prisma.book.create(params);
  }

  async list() {
    return prisma.book.findMany();
  }

  async deleteById(id: number) {
    return prisma.book.delete({ where: { id } });
  }

  async updateById(params: Prisma.BookUpdateArgs, id: number) {
    return prisma.book.update({
      data: params.data,
      where: { id },
    });
  }

  async findOnebyId(id: number) {
    return prisma.book.findUnique({ where: { id } });
  }

  async sortByTitle() {
    return prisma.book.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }
}
