import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import Comment from './Comment';
import Post from './Post';
import User from './User';

@Entity({ name: 'likes' })
export default class Like extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne(() => User, user => user.likes)
	user: User;

	@ManyToOne(() => Post, post => post.Likes)
	post: Post;

	@ManyToOne(() => Comment, comment => comment.Likes, { cascade: true })
	comment: Comment;

	@Column({ name: 'user_id', nullable: true })
	userId: number;

	@Column({ name: 'post_id', nullable: true })
	postId: number;

	@Column({ name: 'comment_id', nullable: true })
	commentId: number;
}
