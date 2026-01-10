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
exports.NotebooksController = void 0;
const common_1 = require("@nestjs/common");
const notebooks_service_1 = require("./notebooks.service");
const create_notebook_dto_1 = require("./dto/create-notebook.dto");
const update_notebook_dto_1 = require("./dto/update-notebook.dto");
const app_contstants_1 = require("../app.contstants");
const user_auth_guard_1 = require("../common/guards/user-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const self_guard_1 = require("../common/guards/self.guard");
let NotebooksController = class NotebooksController {
    notebooksService;
    constructor(notebooksService) {
        this.notebooksService = notebooksService;
    }
    create(createNotebookDto) {
        return this.notebooksService.create(createNotebookDto);
    }
    findAll() {
        return this.notebooksService.findAll();
    }
    findAllByUserId(id) {
        return this.notebooksService.findAllByUserId(id);
    }
    findOne(id) {
        return this.notebooksService.findOne(+id);
    }
    update(id, updateNotebookDto) {
        return this.notebooksService.update(+id, updateNotebookDto);
    }
    remove(id) {
        return this.notebooksService.remove(+id);
    }
};
exports.NotebooksController = NotebooksController;
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notebook_dto_1.CreateNotebookDto]),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "create", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "findAll", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)("user/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "findAllByUserId", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)('user/:id/notebook/:notebookId'),
    __param(0, (0, common_1.Param)('notebookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "findOne", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Put)('user/:id/notebook/:notebookId'),
    __param(0, (0, common_1.Param)('notebookId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notebook_dto_1.UpdateNotebookDto]),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "update", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Delete)('user/:id/notebook/:notebookId'),
    __param(0, (0, common_1.Param)('notebookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotebooksController.prototype, "remove", null);
exports.NotebooksController = NotebooksController = __decorate([
    (0, common_1.Controller)('notebooks'),
    __metadata("design:paramtypes", [notebooks_service_1.NotebooksService])
], NotebooksController);
//# sourceMappingURL=notebooks.controller.js.map