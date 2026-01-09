import { SettingsService } from './settings.service';
import { CreateSettingsDto } from './dto/create-setting.dto';
import { UpdateSettingsDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingsDto): Promise<import("./models/setting.model").Settings>;
    findAll(): Promise<import("./models/setting.model").Settings[]>;
    findOne(id: string): Promise<import("./models/setting.model").Settings>;
    update(id: string, updateSettingDto: UpdateSettingsDto): Promise<import("./models/setting.model").Settings>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
