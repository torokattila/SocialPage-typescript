import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Like from './Like';
import Post from './Post';

@Entity({ name: 'comments' })
export default class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    content: string;

    @Column()
    username: string;

    @ManyToOne(() => Post, post => post.Comments)
    post: Post;

    @OneToMany(() => Like, like => like.comment)
    likes: Like[];
}