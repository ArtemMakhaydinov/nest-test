import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './jobs.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private readonly jobsRepository: Repository<Job>
    ) {}

    async createJob(dto: CreateJobDto) {
        try {
            const job = await this.jobsRepository
                .createQueryBuilder('job')
                .insert()
                .values(dto)
                .returning('*')
                .execute();

            return job.raw[0];
        } catch (err) {
            throw new HttpException(err.detail, HttpStatus.BAD_REQUEST);
        }
    }

    async updateJob(dto: UpdateJobDto) {
        try {
            const job = await this.jobsRepository
                .createQueryBuilder('job')
                .update()
                .set(dto)
                .where('id = :id', { id: dto.id })
                .returning('*')
                .execute();

            return job.raw[0];
        } catch (err) {
            throw new HttpException(err.detail, HttpStatus.BAD_REQUEST);
        }
    }

    async getJobById(id: number) {
        try {
            const job = await this.jobsRepository
                .createQueryBuilder('job')
                .where('job.id = :id', { id })
                .getOne();

            return job;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getJobsInOrder(params) {
        const validOrderClauses = [
            'created_date',
            'name',
            'author_id',
            'skills',
        ];

        const order = validOrderClauses.includes(params.order)
            ? params.order
            : null;

        const limit = isNaN(Number(params.limit)) ? null : Number(params.limit);

        const offset =
            !isNaN(Number(params.page)) && limit
                ? (Number(params.page) - 1) * limit
                : null;
        try {
            const jobs = await this.jobsRepository
                .createQueryBuilder('job')
                .orderBy(order, 'ASC')
                .skip(offset)
                .take(limit)
                .getMany();

            return jobs;
        } catch (err) {
            throw new HttpException(
                'Incorrect query parameters.',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    // async populateJobs() {
    //     for (let i = 1; i <= 50; i++) {
    //         const job = {
    //             name: `${i}${i}${i}${i}`,
    //             description: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
    //             skills: [
    //                 `${Math.floor(Math.random() * i)}`,
    //                 `${Math.floor(Math.random() * i)}`,
    //                 `${Math.floor(Math.random() * i)}`,
    //             ],
    //             author_id: Math.ceil(Math.random() * 3),
    //         };
    //         await this.jobsRepository.save(job);
    //     }
    // }
}
