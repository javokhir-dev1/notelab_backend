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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const notes_model_1 = require("./models/notes.model");
const notebook_model_1 = require("../notebooks/models/notebook.model");
const user_model_1 = require("../users/models/user.model");
let NoteService = class NoteService {
    noteModel;
    notebookModel;
    userModel;
    constructor(noteModel, notebookModel, userModel) {
        this.noteModel = noteModel;
        this.notebookModel = notebookModel;
        this.userModel = userModel;
    }
    async create(dto) {
        const { user_id, notebook_id } = dto;
        if (!user_id) {
            throw new common_1.BadRequestException("user_id is required");
        }
        if (!notebook_id) {
            throw new common_1.BadRequestException("notebook_id is required");
        }
        const user = await this.userModel.findByPk(user_id);
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        const notebook = await this.notebookModel.findByPk(notebook_id);
        if (!notebook) {
            throw new common_1.NotFoundException("notebook not found");
        }
        return this.noteModel.create(dto);
    }
    findAll() {
        return this.noteModel.findAll();
    }
    findAllByUserId(id) {
        return this.noteModel.findAll({ where: { user_id: id } });
    }
    async findOne(id) {
        const note = await this.noteModel.findByPk(id);
        if (!note)
            throw new common_1.NotFoundException('note not found');
        return note;
    }
    async update(id, dto) {
        const { user_id, notebook_id } = dto;
        if (user_id) {
            const user = await this.userModel.findByPk(user_id);
            if (!user) {
                throw new common_1.NotFoundException("user not found");
            }
        }
        if (notebook_id) {
            const notebook = await this.notebookModel.findByPk(notebook_id);
            if (!notebook) {
                throw new common_1.NotFoundException("notebook not found");
            }
        }
        const notebook = await this.findOne(id);
        await notebook.update(dto);
        return notebook;
    }
    async remove(id) {
        const notebook = await this.findOne(id);
        await notebook.destroy();
        return { message: 'note deleted successfully' };
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(notes_model_1.Note)),
    __param(1, (0, sequelize_1.InjectModel)(notebook_model_1.Notebook)),
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object])
], NoteService);
//# sourceMappingURL=note.service.js.map