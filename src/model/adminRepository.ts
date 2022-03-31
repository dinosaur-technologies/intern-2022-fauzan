import { PrismaClient, Prisma, Admin } from '@prisma/client'
const prisma = new PrismaClient()

export class AdminsRepository{
    
    async createAdmin() {
      const newAdmin = await prisma.admin.create({
        data: {
            username: 'Sabin3',
            password: 'sabin3',
            email: 'admin3@admin.com'
        },
    })

       console.log(newAdmin);
    }

    async list() {
      return await prisma.admin.findMany() 
    }

    async delete(id: Prisma.AdminWhereUniqueInput): Promise<Admin> {
      return await prisma.admin.delete({
        where: id,
      })
    }

    
}

