import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './models/notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { User } from 'src/users/models/user.model';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,

    @InjectModel(Notebook)
    private notebookModel: typeof Notebook,

    @InjectModel(User)
    private userModel: typeof User,

  ) { }

  async create(dto: CreateNoteDto) {
    const { user_id, notebook_id } = dto

    if (!user_id) {
      throw new BadRequestException("user_id is required")
    }

    if (!notebook_id) {
      throw new BadRequestException("notebook_id is required")
    }

    const user = await this.userModel.findByPk(user_id)

    if (!user) {
      throw new NotFoundException("user not found")
    }

    const notebook = await this.notebookModel.findByPk(notebook_id)

    if (!notebook) {
      throw new NotFoundException("notebook not found")
    }
    return this.noteModel.create(dto);
  }

  findAll() {
    return this.noteModel.findAll();
  }

  async findOne(id: number) {
    const note = await this.noteModel.findByPk(id);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async update(id: number, dto: UpdateNoteDto) {
    const { user_id, notebook_id } = dto

    if (user_id) {
      const user = await this.userModel.findByPk(user_id)

      if (!user) {
        throw new NotFoundException("user not found")
      }
    }

    if (notebook_id) {
      const notebook = await this.notebookModel.findByPk(notebook_id)

      if (!notebook) {
        throw new NotFoundException("notebook not found")
      }
    }

    const notebook = await this.findOne(id);
    await notebook.update(dto);
    return notebook;
  }

  async remove(id: number) {
    const notebook = await this.findOne(id);
    await notebook.destroy();
    return { message: 'note deleted successfully' };
  }
}
