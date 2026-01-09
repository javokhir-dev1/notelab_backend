import { Model } from 'sequelize-typescript';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { Note } from 'src/notes/models/notes.model';
import { Settings } from 'src/settings/models/setting.model';
interface UserCreationAttr {
    username: string;
    password: string;
    avatar_url?: string;
    bio?: string;
    refresh_token: string;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    username: string;
    password: string;
    avatar_url: string;
    bio: string;
    refresh_token: string;
    notebooks: Notebook[];
    notes: Note[];
    setting: Settings;
}
export {};
