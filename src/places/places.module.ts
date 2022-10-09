import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, PrismaService, CategoriesService],
})
export class PlacesModule {}
