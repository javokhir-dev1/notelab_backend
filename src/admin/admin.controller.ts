// src/users/users.controller.ts
import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles, UserRole } from 'src/app.contstants';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatorGuard } from 'src/common/guards/creator.guard';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminService: AdminService) { }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, CreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
