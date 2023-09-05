import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './job-applications.entity';
import { User } from 'src/users/users.entity';
import { Job } from 'src/jobs/jobs.entity';
import { UsersModule } from 'src/users/users.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
    providers: [JobApplicationsService],
    controllers: [JobApplicationsController],
    imports: [
        TypeOrmModule.forFeature([JobApplication, User, Job]),
        UsersModule,
        JobsModule,
    ],
})
export class JobApplicationsModule {}
