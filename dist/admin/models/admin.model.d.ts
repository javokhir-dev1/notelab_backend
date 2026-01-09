import { Model } from 'sequelize-typescript';
interface AdminCreationAttr {
    username: string;
    password: string;
    avatar_url?: string;
    bio?: string;
    is_creator: boolean;
    refresh_token: string;
}
export declare class Admin extends Model<Admin, AdminCreationAttr> {
    id: number;
    username: string;
    password: string;
    avatar_url: string;
    bio: string;
    is_creator: boolean;
    refresh_token: string;
}
export {};
