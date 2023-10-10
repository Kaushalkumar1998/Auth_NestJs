import { Injectable } from '@nestjs/common';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}