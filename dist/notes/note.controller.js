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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("./note.service");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const app_contstants_1 = require("../app.contstants");
const user_auth_guard_1 = require("../common/guards/user-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const self_guard_1 = require("../common/guards/self.guard");
let NoteController = class NoteController {
    noteService;
    constructor(noteService) {
        this.noteService = noteService;
    }
    create(createNoteDto) {
        return this.noteService.create(createNoteDto);
    }
    findAll() {
        return this.noteService.findAll();
    }
    findAllByFolderId(id, folderId) {
        return this.noteService.findAllByFolderId(id, folderId);
    }
    findOne(id) {
        return this.noteService.findOne(+id);
    }
    update(id, updateNotebookDto) {
        return this.noteService.update(+id, updateNotebookDto);
    }
    remove(id) {
        return this.noteService.remove(+id);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "create", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "findAll", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)("user/:id/folder/:folderId"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)("folderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "findAllByFolderId", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Get)('user/:id/note/:noteId'),
    __param(0, (0, common_1.Param)('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "findOne", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Put)('user/:id/note/:noteId'),
    __param(0, (0, common_1.Param)('noteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "update", null);
__decorate([
    (0, app_contstants_1.Roles)(app_contstants_1.UserRole.ADMIN, app_contstants_1.UserRole.USER),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard, roles_guard_1.RolesGuard, self_guard_1.SelfGuard),
    (0, common_1.Delete)('user/:id/note/:noteId'),
    __param(0, (0, common_1.Param)('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "remove", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controller.js.map