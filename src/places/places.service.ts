import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    await this.categoriesService.findOne(createPlaceDto.category);

    createPlaceDto.category = Number(createPlaceDto.category);

    return this.prisma.places.create({
      data: createPlaceDto,
      include: {
        categories: true,
      },
    });
  }

  findAll() {
    return this.prisma.places.findMany({
      include: {
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID não é um número');
    }
    const places = await this.prisma.places.findUnique({
      where: {
        id: +id,
      },
    });
    if (!places) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return places;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    await this.findOne(id);

    if (updatePlaceDto.category) {
      await this.categoriesService.findOne(updatePlaceDto.category);

      updatePlaceDto.category = Number(updatePlaceDto.category);
    }

    return this.prisma.places.update({
      data: updatePlaceDto,
      where: {
        id: +id,
      },
      include: {
        categories: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.places.delete({
      where: {
        id: +id,
      },
    });
  }
}
