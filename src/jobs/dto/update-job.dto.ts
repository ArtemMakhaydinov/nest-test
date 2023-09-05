import {
    IsArray,
    IsDefined,
    IsInt,
    IsPositive,
    IsString,
    Length,
} from 'class-validator';

export class UpdateJobDto {
    @IsDefined({ message: 'Job id required' })
    @IsPositive({ message: 'Job id must be positive number' })
    @IsInt({ message: 'Job id must be integer' })
    readonly id: number;

    @IsString({ message: 'Name must be a string' })
    @Length(1, 50, {
        message: 'Name must not be empty or longer than 50 characters',
    })
    readonly name: string | undefined;

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
}
