import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateSettingsDto {
    @IsInt()
    user_id: number;

    @IsOptional()
    @IsString()
    theme?: string;

    @IsOptional()
    @IsString()
    language?: string;
}
