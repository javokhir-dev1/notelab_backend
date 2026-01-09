import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from "express";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private generateTokens;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: import("../users/models/user.model").User;
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
