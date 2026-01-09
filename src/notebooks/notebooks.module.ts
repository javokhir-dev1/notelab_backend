import { Module } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notebook } from './models/notebook.model';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Notebook, User]), 
    UsersModule
  ],
  controllers: [NotebooksController],
  providers: [NotebooksService],
})
export class NotebooksModule {}
