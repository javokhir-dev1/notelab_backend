import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private adminModel;
    constructor(adminModel: typeof Admin);
    create(dto: CreateAdminDto): Promise<Admin>;
    findByadminname(username: string): Promise<Admin | null>;
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    update(id: number, dto: UpdateAdminDto): Promise<Admin>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
