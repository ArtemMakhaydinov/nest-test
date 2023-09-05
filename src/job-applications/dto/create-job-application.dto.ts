import { IsInt, IsPositive } from "class-validator";

export class CreateJobApplicationDto {
    @IsPositive({ message: 'User id must be positive number' })
    @IsInt({ message: 'User id must be integer' })
    readonly user_id: number;

    @IsPositive({ message: 'Job id must be positive number' })
    @IsInt({ message: 'Job id must be integer' })
    readonly job_id: number;
}
