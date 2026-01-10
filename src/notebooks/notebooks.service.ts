import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notebook } from './models/notebook.model';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { User } from 'src/users/models/user.model';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectModel(Notebook)
    private notebookModel: typeof Notebook,

    @InjectModel(User)
    private userModel: typeof User
  ) { }

  async create(dto: CreateNotebookDto) {
    const { user_id } = dto

    if (!user_id) {
      throw new BadRequestException("user_id is required")
    }

    const user = await this.userModel.findByPk(user_id)

    if (!user) {
      throw new NotFoundException("User not found")
    }


    return this.notebookModel.create(dto);
  }

  findAll() {
    return this.notebookModel.findAll();
  }

  findAllByUserId(id: string) {
    return this.notebookModel.findAll({ where: { user_id: id } });
  }

  async findOne(id: number) {
    const notebook = await this.notebookModel.findByPk(id);
    if (!notebook) throw new NotFoundException('notebook not found');
    return notebook;
  }

  async update(id: number, dto: UpdateNotebookDto) {
    const { user_id } = dto

    if (user_id) {
      const user = await this.userModel.findByPk(user_id)
      if (!user) {
        throw new NotFoundException("user not found")
      }
    }
    const notebook = await this.findOne(id);
    await notebook.update(dto);
    return notebook;
  }

  async remove(id: number) {
    const notebook = await this.findOne(id);
    await notebook.destroy();
    return { message: 'notebook deleted successfully' };
  }
}
