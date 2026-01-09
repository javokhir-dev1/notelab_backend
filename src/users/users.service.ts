// src/users/users.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) { }

  async create(dto: CreateUserDto) {
    return this.userModel.create(dto)
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ where: { username: username } });
    return user
  }

  findAll() {
    return this.userModel.findAll()
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User topilmadi');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.username && user.username != dto.username) {
      const existing = await this.userModel.findOne({
        where: { username: dto.username }
      });
      if (existing) throw new BadRequestException('username is already exists');
    }

    if (dto.password) {
      if (dto.password.length < 6) {
        throw new BadRequestException('password must be at least 6 characters long');
      }

      dto.password = await bcrypt.hash(dto.password, 7)
    }

    await user.update(dto);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: 'user deleted successfully' };
  }
}
