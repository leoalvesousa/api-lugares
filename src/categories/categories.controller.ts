import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { jwtGuard } from 'src/auth/dto/jwt.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(jwtGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(jwtGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(jwtGuard)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(jwtGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(jwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
