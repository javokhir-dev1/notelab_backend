import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './models/notes.model';
import { User } from 'src/users/models/user.model';
import { Notebook } from 'src/notebooks/models/notebook.model';

@Module({
  imports: [SequelizeModule.forFeature([Note, User, Notebook])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule { }
