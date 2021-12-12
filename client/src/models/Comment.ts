import { Like } from './Like';
import { Post } from './Post';

export class Comment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    username: string;
    userId: number;
    Likes: Like[];
    post: Post;
    postId: number;
    likeId: number;
}