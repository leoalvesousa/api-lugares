import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PlacesModule } from './places/places.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, CategoriesModule, PlacesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
