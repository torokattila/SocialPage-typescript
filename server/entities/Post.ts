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
import Comment from './Comment';
import Like from './Like';
import User from './User';

@Entity({ name: 'posts' })
export default class Post extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column() title: string;

	@Column() content: string;

	@Column() username: string;

	@OneToMany(() => Comment, comment => comment.post, { onDelete: 'CASCADE' })
	Comments: Comment[];

	@OneToMany(() => Like, like => like.post, { onDelete: 'CASCADE' })
	Likes: Like[];

	@ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ name: 'user_id', nullable: true })
	userId: number;
}
