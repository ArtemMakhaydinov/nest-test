import { JobApplication } from 'src/job-applications/job-applications.entity';
import { Job } from 'src/jobs/jobs.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    phone: string;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @OneToMany(() => Job, (job) => job.author)
    created_jobs: Job[];

    @OneToMany(() => JobApplication, (app) => app.user)
    applications: JobApplication[];
}
