import { PrismaClient, Prisma, Fine } from '@prisma/client'
const prisma = new PrismaClient()

export class FinesRepository{
    
    async create() {
      const newFine = await prisma.fine.create({
        data: {
            value: "RM 0.60",
            loanId: 1
        },
    })
       console.log('New fine: ')
       console.log(newFine);
    }

    async delete(id: number) {
        const deleteFine = await prisma.fine.delete({
          where: {
            id,
          }
    })
        console.log('Delete fine: ')
        console.log(deleteFine);
    }

    async findByUserId(loanId: number) {
        const findFine= await prisma.fine.findMany({
          where: {
              loanId,
          }
      })
        console.log('The Fine:')
        console.log(findFine);
    }

}


