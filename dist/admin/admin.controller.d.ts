import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(): Promise<import("./models/admin.model").Admin[]>;
    findOne(id: string): Promise<import("./models/admin.model").Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<import("./models/admin.model").Admin>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
