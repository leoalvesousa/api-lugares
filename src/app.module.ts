import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PlacesModule } from './places/places.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, CategoriesModule, PlacesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
