import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from "express";
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        userId: import("../admin/models/admin.model").Admin;
    }>;
    login(loginUserDto: LoginDto, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
    }>;
    refresh(id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
}
