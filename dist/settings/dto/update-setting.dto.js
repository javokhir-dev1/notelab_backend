"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_setting_dto_1 = require("./create-setting.dto");
class UpdateSettingsDto extends (0, mapped_types_1.PartialType)(create_setting_dto_1.CreateSettingsDto) {
}
exports.UpdateSettingsDto = UpdateSettingsDto;
//# sourceMappingURL=update-setting.dto.js.map