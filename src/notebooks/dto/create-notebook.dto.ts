import { IsString, IsBoolean, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateNotebookDto {
    @IsInt()
    user_id: number;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsBoolean()
    is_favorite?: boolean;
}
