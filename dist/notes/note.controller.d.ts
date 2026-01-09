import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(createNoteDto: CreateNoteDto): Promise<import("./models/notes.model").Note>;
    findAll(): Promise<import("./models/notes.model").Note[]>;
    findOne(id: string): Promise<import("./models/notes.model").Note>;
    update(id: string, updateNotebookDto: UpdateNoteDto): Promise<import("./models/notes.model").Note>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
