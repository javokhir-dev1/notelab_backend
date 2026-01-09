import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
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

    @IsString()
    refresh_token: string
}
