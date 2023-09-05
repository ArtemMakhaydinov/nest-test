import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JobApplication } from './job-applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UsersService } from 'src/users/users.service';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class JobApplicationsService {
    constructor(
        @InjectRepository(JobApplication)
        private readonly jobApplicationsRepository: Repository<JobApplication>,

        @Inject(UsersService)
        private readonly userService: UsersService,

        @Inject(JobsService)
        private jobService: JobsService
    ) {}

    async getJobApplication(dto: CreateJobApplicationDto) {
        try {
            const application = await this.jobApplicationsRepository
                .createQueryBuilder('app')
                .where('app.user_id = :user_id', { user_id: dto.user_id })
                .andWhere('app.job_id = :job_id', { job_id: dto.job_id })
                .getOne();

            return application;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createJobApplication(dto: CreateJobApplicationDto) {
        const user = await this.userService.getUserById(dto.user_id);

        if (!user) {
            throw new HttpException('User is not found.', HttpStatus.NOT_FOUND);
        }

        const job = await this.jobService.getJobById(dto.job_id);

        if (!job) {
            throw new HttpException('Job is not found.', HttpStatus.NOT_FOUND);
        }

        const application = await this.getJobApplication(dto);

        if (application) {
            throw new HttpException(
                'User has already applied for this job.',
                HttpStatus.BAD_REQUEST
            );
        }

        const jobApplication = await this.jobApplicationsRepository
            .createQueryBuilder('app')
            .insert()
            .values(dto)
            .returning('*')
            .execute();

        return jobApplication.raw[0];
    }
}
