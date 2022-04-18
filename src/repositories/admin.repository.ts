import { PrismaClient, Prisma, Admin } from '@prisma/client';
const prisma = new PrismaClient();

export class AdminsRepository {
  async create(params: Prisma.AdminCreateArgs) {
    return prisma.admin.create({
      data: params.data,
      select: { email: true, username: true },
    });
  }

  async list() {
    return prisma.admin.findMany();
  }

  async updateByEmail(params: {data: {password}, where: {email: string}}) {
    const { where, data } = params;
    return prisma.admin.update({
      data,
      where,
    });
  }

  async deleteById(id: number) {
    return prisma.admin.delete({
      where: {
        id
      }
    });
  }

  async findFirst(params: Prisma.AdminFindFirstArgs) {
    return prisma.admin.findFirst(params);
  }

  async findOneByEmail(email: string) {
    return this.findFirst({
      where: {
        email,
      },
    });
  }

  async findOnebyId(id: number) {
    return prisma.admin.findUnique({
      where: {
        id
      }
    });
  }
}
