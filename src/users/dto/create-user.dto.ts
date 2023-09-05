import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsDefined({message: 'Name required'})
    @IsString({ message: 'Name must be a string' })
    @Length(2, 16, { message: 'Name must be between 2 and 16 characters long' })
    readonly name: string;

    @IsDefined({message: 'E-mail required'})
    @IsString({ message: 'E-mail must be a string' })
    @IsEmail({}, { message: 'Incorrect e-mail' })
    readonly email: string;
}
