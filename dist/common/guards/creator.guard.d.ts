import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class CreatorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
