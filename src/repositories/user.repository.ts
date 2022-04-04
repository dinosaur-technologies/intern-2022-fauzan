import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();

export class UsersRepository {
  async create(username: string, password: string, email: string, phone_number: string) {
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        phone_number,
      },
    });
    console.log('New user: ');
    console.log(newUser);
  }

  async list() {
    const listUser = await prisma.user.findMany();

    console.log('List user: ');
    console.log(listUser);
  }

  async deleteById(id: number) {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    console.log('Delete user: ');
    console.log(deleteUser);
  }

  async findOnebyId(id: number) {
    const findUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log('The user that had been found: ');
    console.log(findUser);
  }
}
