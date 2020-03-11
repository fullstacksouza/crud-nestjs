import { Controller, Get, Param, Post, Req, Request, Put, Delete, HttpCode } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('categories')
export class CategoryController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) { }

  @Get()
  async index() {
    return await this.categoryRepo.find()
  }
  @Get(':id')
  async show(@Param() params) {
    return await this.categoryRepo.findOne(params.id)
  }

  @Post()
  async store(@Req() request: Request) {
    const category = this.categoryRepo.create(request.body as any)
    return await this.categoryRepo.save(category)
  }
  @Put(':id')
  async update(@Req() request: Request, @Param() params) {
    await this.categoryRepo.update(params.id, request.body as any)
    return await this.categoryRepo.findOne(params.id)
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param() params) {
    return await this.categoryRepo.delete(params.id);
  }
}
