import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();

export class UsersRepository {
  async create(params: Prisma.UserCreateArgs) {
    return prisma.user.create({
      data: params.data,
      select: { email: true, username: true },
    });
  }

  async list() {
    return prisma.user.findMany();
  }

  async updateByEmail(params: {data: {password}, where: {email: string}}) {
    const { where, data } = params;
    return prisma.user.update({
      data,
      where,
    });
  }

  async deleteById(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  async findOnebyId(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
