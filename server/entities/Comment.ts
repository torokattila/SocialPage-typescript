import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import Like from './Like';
import Post from './Post';
import User from './User';

@Entity({ name: 'comments' })
export default class Comment extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ default: '' })
	content: string;

	@Column() username: string;

	@ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ name: 'user_id', nullable: true })
	userId: number;

	@ManyToOne(() => Post, post => post.Comments, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_id' })
	post: Post;

	@Column({ name: 'post_id', nullable: true })
	postId: number;

	@OneToMany(() => Like, like => like.comment, { onDelete: 'CASCADE' })
	Likes: Like[];

	@Column({ name: 'like_id', nullable: true })
	likeId: number;
}
