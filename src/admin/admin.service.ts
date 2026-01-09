// src/admins/admins.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin
  ) { }

  async create(dto: CreateAdminDto) {
    return this.adminModel.create(dto);
  }

  async findByadminname(username: string) {
    const admin = await this.adminModel.findOne({ where: { username } });
    return admin
  }

  findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException('admin topilmadi');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (dto.username && admin.username != dto.username) {
      const existing = await this.adminModel.findOne({
        where: { username: dto.username }
      });
      if (existing) throw new BadRequestException('adminname is already exists');
    }

    if (dto.password) {
      if (dto.password.length < 6) {
        throw new BadRequestException('password must be at least 6 characters long');
      }

      dto.password = await bcrypt.hash(dto.password, 7)
    }
    await admin.update(dto);
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: 'admin deleted successfully' };
  }
}
