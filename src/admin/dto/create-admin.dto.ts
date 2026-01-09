import { IsString, IsOptional, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class CreateAdminDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    avatar_url: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string;

    @IsBoolean()
    is_creator: boolean

    @IsString()
    refresh_token: string
}
