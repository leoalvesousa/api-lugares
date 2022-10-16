import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { jwtGuard } from 'src/auth/dto/jwt.guard';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(jwtGuard)
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }
  @UseGuards(jwtGuard)
  @Get()
  findAll() {
    return this.placesService.findAll();
  }
  @UseGuards(jwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.placesService.findOne(+id);
  }
  @UseGuards(jwtGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @UseGuards(jwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.placesService.remove(+id);
  }
}
