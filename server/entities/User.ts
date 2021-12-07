import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import Comment from './Comment';
import Like from './Like';
import Post from './Post';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 50 })
	username: string;

	@Column({ length: 255, unique: true })
	password: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => Post, post => post.user)
	posts: Post[];

	@OneToMany(() => Like, like => like.user)
	likes: Like[];

	@OneToMany(() => Comment, comment => comment.user)
	comments: Comment[];
}
