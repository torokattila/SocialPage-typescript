import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import Comment from './Comment';
import Post from './Post';
import User from './User';

@Entity({ name: 'likes' })
export default class Like extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ name: 'user_id', nullable: true })
	userId: number;

	@ManyToOne(() => Post, post => post.Likes, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_id' })
	post: Post;

	@Column({ name: 'post_id', nullable: true })
	postId: number;

	@ManyToOne(() => Comment, comment => comment.Likes, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'comment_id' })
	comment: Comment;

	@Column({ name: 'comment_id', nullable: true })
	commentId: number;
}
