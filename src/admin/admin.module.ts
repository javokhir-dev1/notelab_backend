// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { AdminService } from './admin.service';
import { AdminsController } from './admin.controller';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule { }
