import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: import("../users/models/user.model").User;
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
