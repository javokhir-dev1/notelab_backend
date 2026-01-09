import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Response } from "express";
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
export declare class AuthService {
    private readonly adminService;
    private readonly jwtService;
    constructor(adminService: AdminService, jwtService: JwtService);
    private generateTokens;
    register(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        userId: import("../admin/models/admin.model").Admin;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
    }>;
    refreshToken(userId: number, refresh_token: string, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
}
