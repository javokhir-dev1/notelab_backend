import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Roles, UserRole } from 'src/app.contstants';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SelfGuard } from 'src/common/guards/self.guard';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) { }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Post()
  create(@Body() createNotebookDto: CreateNotebookDto) {
    return this.notebooksService.create(createNotebookDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get()
  findAll() {
    return this.notebooksService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get('user/:id/notebook/:notebookId')
  findOne(@Param('notebookId') id: string) {
    return this.notebooksService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Put('user/:id/notebook/:notebookId')
  update(@Param('notebookId') id: string, @Body() updateNotebookDto: UpdateNotebookDto) {
    return this.notebooksService.update(+id, updateNotebookDto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Delete('user/:id/notebook/:notebookId')
  remove(@Param('notebookId') id: string) {
    return this.notebooksService.remove(+id);
  }
}
