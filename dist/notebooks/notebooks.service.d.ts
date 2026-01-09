import { Notebook } from './models/notebook.model';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { User } from 'src/users/models/user.model';
export declare class NotebooksService {
    private notebookModel;
    private userModel;
    constructor(notebookModel: typeof Notebook, userModel: typeof User);
    create(dto: CreateNotebookDto): Promise<Notebook>;
    findAll(): Promise<Notebook[]>;
    findOne(id: number): Promise<Notebook>;
    update(id: number, dto: UpdateNotebookDto): Promise<Notebook>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
