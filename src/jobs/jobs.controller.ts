import { Controller, Body, Post, Get, Put, Query } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
    constructor(private jobsService: JobsService) {}

    @Post()
    async create(@Body() jobDto: CreateJobDto) {
        return await this.jobsService.createJob(jobDto);
    }

    @Get()
    async getJobs(@Query() params) {
        return await this.jobsService.findJobs(params);
    }

    @Put()
    async update(@Body() jobDto: UpdateJobDto) {
        return await this.jobsService.updateJob(jobDto);
    }

    @Post('/popdb')
    async populateDb() {
        return await this.jobsService.populateJobs();
    }
}
