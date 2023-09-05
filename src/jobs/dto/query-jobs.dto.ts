import { IsIn, IsNumberString, IsPositive } from 'class-validator';

export class QueryJobDto {
    @IsIn(['created_date', 'name', 'author_id', 'skills'], {
        message: 'Invalid order',
    })
    readonly order: string | undefined;

    @IsNumberString({}, {message: 'Invalid limit'})
    readonly limit: string | undefined;

    @IsNumberString({}, {message: 'Invalid page'})
    readonly page: string | undefined;
}
