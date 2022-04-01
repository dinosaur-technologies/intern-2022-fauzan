import { PrismaClient, Prisma, Loan } from '@prisma/client'
const prisma = new PrismaClient()

export class LoansRepository{
    
    async create() {
      const newLoan = await prisma.loan.create({
        data: {
          bookId:1,
          userId:3,
          startDate:"2022-05-02T17:14:30.047Z"

        },
    })
       console.log('New loan: ')
       console.log(newLoan);
    }

    async findByUserId(userId: number) {
        const findLoan= await prisma.loan.findMany({
          where: {
              userId,
          }
      })
        console.log('The loan query: ')
        console.log(findLoan);
    }

    async delete(id: number) {
        const deleteLoan = await prisma.loan.delete({
          where: {
            id,
          }
        })
        console.log('Delete Loan: ')
        console.log(deleteLoan);
      }
  
}


