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

  async deleteById(id: number) {
    return prisma.admin.delete({ where: { id } });
  }

  async findOnebyId(id: number) {
    return prisma.admin.findUnique({ where: { id } });
  }
}
