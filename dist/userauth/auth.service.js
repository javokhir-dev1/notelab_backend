"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: process.env.ACCESS_TOKEN_TIME,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME,
        });
        return { accessToken, refreshToken };
    }
    async register(createUserDto) {
        const user = await this.usersService.findByUsername(createUserDto.username);
        if (user) {
            throw new common_1.BadRequestException("username is already exists");
        }
        const { password } = createUserDto;
        if (password.length < 6) {
            throw new common_1.BadRequestException('password must be at least 6 characters long');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 7);
        const newUser = await this.usersService.create({ ...createUserDto, password: hashedPassword });
        return {
            message: "User registered successfully",
            userId: newUser,
        };
    }
    async login(loginDto, res) {
        const user = await this.usersService.findByUsername(loginDto.username);
        if (!user)
            throw new common_1.UnauthorizedException("Invalid email or password.");
        const passwordValid = await bcrypt_1.default.compare(loginDto.password, user.password);
        if (!passwordValid)
            throw new common_1.UnauthorizedException("Invalid email or password");
        const { accessToken, refreshToken } = await this.generateTokens({ id: user.id, role: "USER" });
        user.refresh_token = await bcrypt_1.default.hash(refreshToken, 7);
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
    async logout(refreshToken, res) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException("Refresh token missing");
        }
        const userData = this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        const user = await this.usersService.findOne(userData.id);
        if (!user)
            throw new common_1.UnauthorizedException("User not found");
        user.refresh_token = "";
        await user.save();
        res.clearCookie("refreshToken");
        return { message: "User logged out successfully" };
    }
    async refreshToken(userId, refresh_token, res) {
        if (!refresh_token) {
            throw new common_1.ForbiddenException("Refresh token not found");
        }
        const decoded = this.jwtService.decode(refresh_token);
        if (userId !== decoded["id"]) {
            throw new common_1.ForbiddenException("Token does not belong to this user");
        }
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refresh_token) {
            throw new common_1.ForbiddenException("User not authorized");
        }
        const valid = await bcrypt_1.default.compare(refresh_token, user.refresh_token);
        if (!valid)
            throw new common_1.ForbiddenException("Invalid refresh token");
        const { accessToken, refreshToken } = await this.generateTokens({ id: user.id, role: "USER" });
        user.refresh_token = await bcrypt_1.default.hash(refreshToken, 7);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map