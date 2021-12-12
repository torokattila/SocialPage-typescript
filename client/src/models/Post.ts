import { Like } from './Like';
import { Comment } from './Comment';

export class Post {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    username: string;
    Likes: Like[];
    Comments: Comment[];
}