// src/users/users.controller.ts
import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, UserRole } from 'src/app.contstants';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SelfGuard } from 'src/common/guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
