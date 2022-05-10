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

  async updateById(params: { data: Prisma.BookUpdateInput; where: { id: number } }) {
    const { where, data } = params;
    return prisma.book.update({
      data,
      where,
    });
  }

  async findOneByTitle(title: string) {
    return prisma.book.findUnique({ where: { title } });
  }

  async findOneById(id: number) {
    return prisma.book.findUnique({ where: { id } });
  }

  async count(params: Prisma.BookWhereInput) {
    return prisma.book.count({where:params});
  }

  async sort(params: {
    where: Prisma.BookWhereInput;
    orderBy: Prisma.BookOrderByWithRelationInput;
    skip: number;
    take: number;
  }) {
    const { where,orderBy, skip, take } = params;
    return prisma.book.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }
}
