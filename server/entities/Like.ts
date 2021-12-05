import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Comment from './Comment';
import Post from './Post';
import User from './User';

@Entity({ name: 'likes' })
export default class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Post, post => post.likes)
    post: Post;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Comment, comment => comment.likes)
    comment: Comment;
}