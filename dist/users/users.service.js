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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(dto) {
        return this.userModel.create(dto);
    }
    async findByUsername(username) {
        const user = await this.userModel.findOne({ where: { username: username } });
        return user;
    }
    findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        const user = await this.userModel.findByPk(id);
        if (!user)
            throw new common_1.NotFoundException('User topilmadi');
        return user;
    }
    async update(id, dto) {
        const user = await this.findOne(id);
        if (dto.username && user.username != dto.username) {
            const existing = await this.userModel.findOne({
                where: { username: dto.username }
            });
            if (existing)
                throw new common_1.BadRequestException('username is already exists');
        }
        if (dto.password) {
            if (dto.password.length < 6) {
                throw new common_1.BadRequestException('password must be at least 6 characters long');
            }
            dto.password = await bcrypt_1.default.hash(dto.password, 7);
        }
        await user.update(dto);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { message: 'user deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map