import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Roles, UserRole } from '../app.contstants';
import { UserAuthGuard } from '../common/guards/user-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { SelfGuard } from '../common/guards/self.guard';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get("user/:id/folder/:folderId")
  findAllByFolderId(@Param('id') id: string, @Param("folderId") folderId: string) {
    return this.noteService.findAllByFolderId(id, folderId);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get('user/:id/note/:noteId')
  findOne(@Param('noteId') id: string) {
    return this.noteService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Put('user/:id/note/:noteId')
  update(@Param('noteId') id: string, @Body() updateNotebookDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNotebookDto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Delete('user/:id/note/:noteId')
  remove(@Param('noteId') id: string) {
    return this.noteService.remove(+id);
  }
}
