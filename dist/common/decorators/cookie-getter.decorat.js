"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieGetter = void 0;
const common_1 = require("@nestjs/common");
exports.CookieGetter = (0, common_1.createParamDecorator)((key, context) => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[key];
    if (!refreshToken) {
        throw new common_1.BadRequestException("Token is not found.");
    }
    return refreshToken;
});
//# sourceMappingURL=cookie-getter.decorat.js.map