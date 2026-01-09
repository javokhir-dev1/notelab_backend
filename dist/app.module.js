"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const notebooks_module_1 = require("./notebooks/notebooks.module");
const note_module_1 = require("./notes/note.module");
const settings_module_1 = require("./settings/settings.module");
const auth_module_1 = require("./userauth/auth.module");
const auth_module_2 = require("./adminauth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadModels: true,
                sync: { alter: true },
                synchronize: true,
            }),
            users_module_1.UsersModule,
            notebooks_module_1.NotebooksModule,
            note_module_1.NoteModule,
            settings_module_1.SettingsModule,
            auth_module_1.UserAuthModule,
            auth_module_2.AdminAuthModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map