import { User } from 'src/users/users.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    description: string;

    @Column({ type: 'simple-array', nullable: true })
    skills: string[];

    @Column({ type: 'integer', nullable: false, update: false })
    author_id: number;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updated_date: Date;

    @ManyToOne(() => User, (user) => user.created_jobs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    author: User;
}
