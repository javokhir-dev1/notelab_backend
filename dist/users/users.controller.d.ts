import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./models/user.model").User[]>;
    findOne(id: string): Promise<import("./models/user.model").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./models/user.model").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
