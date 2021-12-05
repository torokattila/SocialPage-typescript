import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Comment from './Comment';
import Like from './Like';
import User from './User';

@Entity({ name: 'posts' })
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    username: string;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, like => like.post)
    likes: Like[];

    @ManyToOne(() => User, user => user.posts)
    user: User;
}