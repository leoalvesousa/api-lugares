import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateLogDto } from './dto/create-user-log.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
  async login(createLogDto: CreateLogDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: createLogDto.email,
      },
    });
    if (!user) {
      throw new BadRequestException('Email ou senha invalido');
    }
    if (!(await bcrypt.compare(createLogDto.password, user.password))) {
      throw new BadRequestException('Email ou senha invalido');
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    return {
      access_token: token,
    };
  }
}
