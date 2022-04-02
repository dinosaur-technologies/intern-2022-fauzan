import { PrismaClient, Prisma, Admin } from '@prisma/client'
const prisma = new PrismaClient()

export class AdminsRepository{
    
    async create(
        username: string,
        password: string,
        email: string, 
    ){
        const newAdmin = await prisma.admin.create({
          data:{
            username,
            password,
            email,
          }  
        })
        console.log('New admin: ')
        console.log(newAdmin);
    }

    async list() {
      const listAdmin = await prisma.admin.findMany() 

      console.log('List admin: ')
      console.log(listAdmin);
    }

    async deleteById(id: number) {
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

