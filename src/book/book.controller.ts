import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllData(): Promise<Book[]> {
    return this.bookService.findAll();
  }
}
