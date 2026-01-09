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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const setting_model_1 = require("./models/setting.model");
const user_model_1 = require("../users/models/user.model");
let SettingsService = class SettingsService {
    settingsModel;
    userModel;
    constructor(settingsModel, userModel) {
        this.settingsModel = settingsModel;
        this.userModel = userModel;
    }
    async create(dto) {
        const { user_id } = dto;
        if (!user_id) {
            throw new common_1.BadRequestException("user is required");
        }
        const user = await this.userModel.findByPk(user_id);
        const isSettingExsists = await this.settingsModel.findOne({ where: { user_id } });
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        if (isSettingExsists) {
            throw new common_1.BadRequestException("Settings for this user have already been created");
        }
        return this.settingsModel.create(dto);
    }
    findAll() {
        return this.settingsModel.findAll();
    }
    async findOne(id) {
        const setting = await this.settingsModel.findByPk(id);
        if (!setting)
            throw new common_1.NotFoundException('Settings not found');
        return setting;
    }
    async update(id, dto) {
        const { user_id } = dto;
        if (user_id) {
            const user = await this.userModel.findByPk(user_id);
            if (!user) {
                throw new common_1.NotFoundException("user not found");
            }
        }
        const setting = await this.findOne(id);
        await setting.update(dto);
        return setting;
    }
    async remove(id) {
        const setting = await this.findOne(id);
        await setting.destroy();
        return { message: 'Settings deleted successfully' };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(setting_model_1.Settings)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], SettingsService);
//# sourceMappingURL=settings.service.js.map