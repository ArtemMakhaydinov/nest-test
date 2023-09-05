import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.usersRepository
                .createQueryBuilder('user')
                .insert()
                .values(dto)
                .returning('*')
                .execute();

            return user.raw[0];
        } catch (err) {
            throw new HttpException(err.detail, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.usersRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id })
                .getOne();

            return user;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllUsers() {
        try {
            const users = await this.usersRepository.find();
            return users;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
