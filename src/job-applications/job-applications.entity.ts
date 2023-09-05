import { Job } from 'src/jobs/jobs.entity';
import { User } from 'src/users/users.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'job_applications' })
export class JobApplication {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'integer', nullable: false, update: false })
    user_id: number;

    @Column({ type: 'integer', nullable: false, update: false })
    job_id: number;

    @Column({ type: 'boolean', default: false })
    is_viewed: boolean;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
    job: Job;
}
