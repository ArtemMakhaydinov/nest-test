import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './jobs.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { QueryJobDto } from './dto/query-jobs.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private readonly jobsRepository: Repository<Job>
    ) {}

    async createJob(dto: CreateJobDto): Promise<Job> {
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

    async updateJob(dto: UpdateJobDto): Promise<Job> {
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

    async getJobById(id: number): Promise<Job> {
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

    async getJobsInOrder(dto: QueryJobDto): Promise<Job[]> {
        const order = dto.order || null;

        const limit = Math.abs(Number(dto.limit)) || null;

        const offset = dto.page && limit 
            ? Math.abs(Number(dto.page) - 1) * limit 
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
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
