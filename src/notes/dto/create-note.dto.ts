import { IsString, IsBoolean, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
    @IsInt()
    user_id: number;

    @IsInt()
    notebook_id: number;

    @IsString()
    @MinLength(3)
    content: string;

    @IsString()
    type: string;

    @IsBoolean()
    is_pinned: boolean

    @IsBoolean()
    is_favorite: boolean
}
