import { PrismaClient, Prisma, Admin } from '@prisma/client';
const prisma = new PrismaClient();

export class AdminsRepository {
  async create(params: Prisma.AdminCreateArgs) {
    return prisma.admin.create(params);
  }

  async list() {
    const listAdmin = await prisma.admin.findMany();

    console.log('List admin: ');
    console.log(listAdmin);
  }

  async deleteById(id: number) {
    const deleteAdmin = await prisma.admin.delete({
      where: {
        id,
      },
    });
    console.log('Delete admin: ');
    console.log(deleteAdmin);
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
    const findAdmin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    console.log('The admin that had been found: ');
    console.log(findAdmin);
  }
}
