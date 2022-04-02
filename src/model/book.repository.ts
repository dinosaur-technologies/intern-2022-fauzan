import { PrismaClient, Prisma, Book } from '@prisma/client'
const prisma = new PrismaClient()

export class BooksRepository{
    
    async create(
      title: string,
      author: string,
      publisher: string,
      year: number ,
      description: string,
      ISBN: string,
      createdBy: number, 
    ){
        const newBook = await prisma.book.create({
          data:{
            title,
            author,
            publisher,
            year,
            description,
            ISBN,
            createdBy,
          }  
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

