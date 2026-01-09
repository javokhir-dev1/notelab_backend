import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user.role == "ADMIN") {
            return true
        }
        
        if (!user) throw new ForbiddenException("User not authenticated");
        
        const userId = request.body?.user_id

        if (userId) {
            if (user.id != userId) {
                throw new ForbiddenException("Access denied - not your account")
            }
        }

        const paramId = Number(request.params.id);
        if (paramId) {
            if (user.id !== paramId) {
                throw new ForbiddenException("Access denied — not your account");
            }
        }

        if (!userId && !paramId) {
            throw new ForbiddenException("User not found")
        }

        return true;
    }
}