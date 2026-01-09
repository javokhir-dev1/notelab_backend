import { Model } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
interface SettingsCreationAttr {
    user_id: number;
    theme?: string;
    language?: string;
}
export declare class Settings extends Model<Settings, SettingsCreationAttr> {
    id: number;
    user_id: number;
    theme: string;
    language: string;
    user: User;
}
export {};
