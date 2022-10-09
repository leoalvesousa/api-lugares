import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateLogDto } from './dto/create-user-log.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('Email já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashPassword;

    return this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }
  async login(createUserLogDto: CreateLogDto) {
    const user = this.prisma.users.findFirst({
      where: {
        email: createUserLogDto,
      },
    });
  }
}
