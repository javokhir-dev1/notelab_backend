"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotebookDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_notebook_dto_1 = require("./create-notebook.dto");
class UpdateNotebookDto extends (0, mapped_types_1.PartialType)(create_notebook_dto_1.CreateNotebookDto) {
}
exports.UpdateNotebookDto = UpdateNotebookDto;
//# sourceMappingURL=update-notebook.dto.js.map