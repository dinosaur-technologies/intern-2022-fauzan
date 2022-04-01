import { PrismaClient, Prisma, Admin } from '@prisma/client'
const prisma = new PrismaClient()

export class AdminsRepository{
    
    async create() {
      const newAdmin = await prisma.admin.create({
        data: {
            username: 'Admin3',
            password: 'admin3',
            email: 'admin3@admin.com',
        },
    })
       console.log('New admin: ')
       console.log(newAdmin);
    }

    async list() {
      const listAdmin = await prisma.admin.findMany() 

      console.log('List admin: ')
      console.log(listAdmin);
    }

    async delete(id: number) {
      const deleteAdmin = await prisma.admin.delete({
        where: {
          id,
        }
      })
      console.log('Delete admin: ')
      console.log(deleteAdmin);
    }

    async findOnebyId(id: number) {
      const findAdmin= await prisma.admin.findUnique({
        where: {
            id,
        }
    })
      console.log('The admin that had been found: ')
      console.log(findAdmin);
    }
}

// let test = new AdminsRepository()

// test.create()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())