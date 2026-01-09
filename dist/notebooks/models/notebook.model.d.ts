import { Model } from 'sequelize-typescript';
import { Note } from 'src/notes/models/notes.model';
import { User } from 'src/users/models/user.model';
interface NotebookCreationAttr {
    user_id: number;
    title: string;
    is_favorite?: boolean;
}
export declare class Notebook extends Model<Notebook, NotebookCreationAttr> {
    id: number;
    user_id: number;
    title: string;
    is_favorite: boolean;
    user: User;
    notes: Note[];
}
export {};
