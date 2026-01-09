import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from "bcrypt"
import { LoginDto } from './dto/login.dto';
import { Response } from "express"

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    private async generateTokens(payload: any) {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: process.env.ACCESS_TOKEN_TIME as any,
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME as any,
        });

        return { accessToken, refreshToken };
    }

    async register(createUserDto: CreateUserDto) {

        const user = await this.usersService.findByUsername(createUserDto.username)

        if (user) {
            throw new BadRequestException("username is already exists");
        }

        const { password } = createUserDto

        if (password.length < 6) {
            throw new BadRequestException('password must be at least 6 characters long');
        }

        const hashedPassword = await bcrypt.hash(password, 7)

        const newUser = await this.usersService.create({ ...createUserDto, password: hashedPassword });
        return {
            message: "User registered successfully",
            userId: newUser,
        }
    }

    async login(loginDto: LoginDto, res: Response) {
        const user = await this.usersService.findByUsername(loginDto.username);
        if (!user) throw new UnauthorizedException("Invalid email or password.");

        const passwordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if (!passwordValid)
            throw new UnauthorizedException("Invalid email or password");

        const { accessToken, refreshToken } = await this.generateTokens({ id: user.id, role: "USER" });

        user.refresh_token = await bcrypt.hash(refreshToken, 7);
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return {
            message: "Login successful.",
            userId: user.id,
            access_token: accessToken,
        };
    }


    async logout(refreshToken: string, res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException("Refresh token missing");
        }

        const userData = this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });

        const user = await this.usersService.findOne(userData.id);
        if (!user) throw new UnauthorizedException("User not found");

        user.refresh_token = "";
        await user.save();

        res.clearCookie("refreshToken");
        return { message: "User logged out successfully" };
    }


    async refreshToken(userId: number, refresh_token: string, res: Response) {
        if (!refresh_token) {
            throw new ForbiddenException("Refresh token not found");
        }

        const decoded = this.jwtService.decode(refresh_token);
        if (userId !== decoded["id"]) {
            throw new ForbiddenException("Token does not belong to this user");
        }

        const user = await this.usersService.findOne(userId);
        if (!user || !user.refresh_token) {
            throw new ForbiddenException("User not authorized");
        }

        const valid = await bcrypt.compare(refresh_token, user.refresh_token);
        if (!valid) throw new ForbiddenException("Invalid refresh token");

        const { accessToken, refreshToken } = await this.generateTokens({ id: user.id, role: "USER"});

        user.refresh_token = await bcrypt.hash(refreshToken, 7);
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return {
            message: "Access token refreshed successfully",
            userId: user.id,
            access_token: accessToken,
        };
    }
}
