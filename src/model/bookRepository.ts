import { PrismaClient, Prisma, Book } from '@prisma/client'
const prisma = new PrismaClient()

export class BooksRepository{
    
      async create() {
        const newBook = await prisma.book.create({
          data: {
            title: "Python Learn",
            author: "Adam",
            publisher: "Tech",
            year: 2012,
            description: "Those who want to learn python",
            ISBN: "1113273524",
            createdBy: 4
          },
      })

      console.log('New book: ')
      console.log(newBook);
    }

    async list() {
        const listBook = await prisma.book.findMany() 
  
        console.log('List book: ')
        console.log(listBook);
      }
  
    async delete(id: number) {
        const deleteBook = await prisma.book.delete({
          where: {
            id,
          }
        })
        console.log('Delete book: ')
        console.log(deleteBook);
      }

    async update(id: number) {
      const updateUser = await prisma.book.update({
        where: {
          id,
        },
        data: {
          title: "Programming",
        },
      })
    }

    async findOnebyId(id: number) {
        const findBook= await prisma.book.findUnique({
          where: {
              id,
          }
      })
        console.log('The book that had been found: ')
        console.log(findBook);
      }
    
    async sortByTitle() {
        const sortBook = await prisma.book.findMany({
            orderBy: {
                title: 'asc'
            }
        }) 
  
        console.log('Sort book: ')
        console.log(sortBook);
      }
}

let test = new BooksRepository()

test.create()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())