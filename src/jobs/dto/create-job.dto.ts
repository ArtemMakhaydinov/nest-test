import { IsArray, IsDefined, IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateJobDto {
    @IsDefined({message: 'Name required'})
    @IsString({ message: 'Name must be a string' })
    @Length(1, 50, { message: 'Name must not empty or be longer than 50 characters' })
    readonly name: string;

    @IsString({ message: 'Description must be a string' })
    @Length(0, 50, {
        message: 'Description must not be longer than 300 characters',
    })
    readonly description: string | undefined;

    @IsArray({ message: 'Skills must be an array' })
    @IsString({
        each: true,
        message: 'Skills must only contain string values',
    })
    readonly skills: string[] | undefined;

    @IsDefined({message: 'Author id required'})
    @IsPositive({ message: 'Author id must be positive number' })
    @IsInt({ message: 'Author id must be integer' })
    readonly author_id: number;
}
