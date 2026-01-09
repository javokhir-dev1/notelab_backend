import { Settings } from './models/setting.model';
import { CreateSettingsDto } from './dto/create-setting.dto';
import { UpdateSettingsDto } from './dto/update-setting.dto';
import { User } from '../users/models/user.model';
export declare class SettingsService {
    private settingsModel;
    private userModel;
    constructor(settingsModel: typeof Settings, userModel: typeof User);
    create(dto: CreateSettingsDto): Promise<Settings>;
    findAll(): Promise<Settings[]>;
    findOne(id: number): Promise<Settings>;
    update(id: number, dto: UpdateSettingsDto): Promise<Settings>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
