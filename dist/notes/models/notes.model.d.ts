import { Model } from 'sequelize-typescript';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { User } from 'src/users/models/user.model';
interface NoteCreationAttr {
    user_id: number;
    notebook_id: number;
    content: string;
    type: string;
    is_pinned: boolean;
    is_favorite: boolean;
}
export declare class Note extends Model<Note, NoteCreationAttr> {
    id: number;
    user_id: number;
    notebook_id: number;
    content: string;
    type: string;
    is_pinned: boolean;
    is_favorite: boolean;
    user: User;
    notebook: Notebook;
}
export {};
