import { PrismaClient, Prisma, Admin } from '@prisma/client';
const prisma = new PrismaClient();

export class AdminsRepository {
  async create(params: Prisma.AdminCreateArgs) {
    return prisma.admin.create({
      data: params.data,
      select: {
        id: true, 
        email: true,
        username: true,
        password: false,
        createdAt: true,
        updatedAt: true
      },
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
      select: {
        id: true, 
        email: true,
        username: true,
        password: false,
        createdAt: true,
        updatedAt: true
      },
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
    return prisma.admin.findFirst({
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
