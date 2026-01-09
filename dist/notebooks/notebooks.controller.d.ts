import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
export declare class NotebooksController {
    private readonly notebooksService;
    constructor(notebooksService: NotebooksService);
    create(createNotebookDto: CreateNotebookDto): Promise<import("./models/notebook.model").Notebook>;
    findAll(): Promise<import("./models/notebook.model").Notebook[]>;
    findOne(id: string): Promise<import("./models/notebook.model").Notebook>;
    update(id: string, updateNotebookDto: UpdateNotebookDto): Promise<import("./models/notebook.model").Notebook>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
