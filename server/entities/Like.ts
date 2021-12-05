import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Comment from './Comment';
import Post from './Post';
import User from './User';

@Entity({ name: 'likes' })
export default class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Post, post => post.Likes)
    post: Post;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Comment, comment => comment.likes)
    comment: Comment;

    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    postId: number;

    @Column({ nullable: true })
    commentId: number;
}