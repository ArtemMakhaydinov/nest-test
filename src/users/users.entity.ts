import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

interface UserCreationAttrs {
    name: string;
    email: string;
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdDate: Date;
}
