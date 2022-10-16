import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categories.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  async findOne(id: number) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID não é um número');
    }
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    return this.prisma.categories.update({
      data: {
        name: updateCategoryDto.name,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.categories.delete({
      where: {
        id,
      },
    });
  }
}
