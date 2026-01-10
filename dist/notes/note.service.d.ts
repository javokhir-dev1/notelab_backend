import { Note } from './models/notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { User } from 'src/users/models/user.model';
export declare class NoteService {
    private noteModel;
    private notebookModel;
    private userModel;
    constructor(noteModel: typeof Note, notebookModel: typeof Notebook, userModel: typeof User);
    create(dto: CreateNoteDto): Promise<Note>;
    findAll(): Promise<Note[]>;
    findAllByUserId(id: string): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    update(id: number, dto: UpdateNoteDto): Promise<Note>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
