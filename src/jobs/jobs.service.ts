import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './jobs.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobsRepository: Repository<Job>
    ) {}

    async createJob(dto: CreateJobDto) {
        const job = await this.jobsRepository.save(dto);
        return job;
    }

    async updateJob(dto: UpdateJobDto) {
        const job = await this.jobsRepository.update({ id: dto.id }, dto);
        return job;
    }

    async findJobs(params) {
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

        const jobs = await this.jobsRepository
            .createQueryBuilder('job')
            .orderBy(order, 'ASC')
            .limit(limit)
            .offset(offset)
            .getMany();

        return jobs;
    }

    async populateJobs() {
        for (let i = 0; i < 50; i++) {
            const job = {
                name: `${i}${i}${i}${i}`,
                description: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
                skills: [`${i}`, `${i + 1}`, `${i + 2}`],
                author_id: 1,
            };
            await this.jobsRepository.save(job);
        }
    }
}
