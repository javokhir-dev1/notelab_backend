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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("./models/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
let AdminService = class AdminService {
    adminModel;
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async create(dto) {
        return this.adminModel.create(dto);
    }
    async findByadminname(username) {
        const admin = await this.adminModel.findOne({ where: { username } });
        return admin;
    }
    findAll() {
        return this.adminModel.findAll();
    }
    async findOne(id) {
        const admin = await this.adminModel.findByPk(id);
        if (!admin)
            throw new common_1.NotFoundException('admin topilmadi');
        return admin;
    }
    async update(id, dto) {
        const admin = await this.findOne(id);
        if (dto.username && admin.username != dto.username) {
            const existing = await this.adminModel.findOne({
                where: { username: dto.username }
            });
            if (existing)
                throw new common_1.BadRequestException('adminname is already exists');
        }
        if (dto.password) {
            if (dto.password.length < 6) {
                throw new common_1.BadRequestException('password must be at least 6 characters long');
            }
            dto.password = await bcrypt_1.default.hash(dto.password, 7);
        }
        await admin.update(dto);
        return admin;
    }
    async remove(id) {
        const admin = await this.findOne(id);
        await admin.destroy();
        return { message: 'admin deleted successfully' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map