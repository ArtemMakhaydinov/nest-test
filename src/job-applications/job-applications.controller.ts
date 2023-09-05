import { Controller, Post, Body } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Controller('applications')
export class JobApplicationsController {
    constructor(private jobApplicationsService: JobApplicationsService) {}

    @Post()
    async create(@Body() appDto: CreateJobApplicationDto) {
        return await this.jobApplicationsService.createJobApplication(appDto);
    }
}
