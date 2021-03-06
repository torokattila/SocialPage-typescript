import Like from 'entities/Like';
import { getConnection, getRepository } from 'typeorm';
import Comment from '../entities/Comment';
import { getLikesRepository } from './LikesService';

export type CommentListType = {
	listOfComments: Comment[];
	likedComments: Like[];
};

const getCommentRepository = () => getConnection().getRepository(Comment);

const create = async (
	postId: number,
	userId: number,
	username: string,
	content: string
): Promise<Comment> => {
	const commentEntity = getCommentRepository().create();
	commentEntity.postId = postId;
	commentEntity.createdAt = new Date();
	commentEntity.userId = userId;
	commentEntity.username = username;
	commentEntity.content = content;

	try {
		await getCommentRepository().save(commentEntity);

		return commentEntity;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const getCommentsForPost = async (
	postId: number,
	userId: number
): Promise<CommentListType> => {
	try {
		const listOfComments = await getCommentRepository().find({
			where: { postId },
			relations: ['Likes']
		});
		const likedComments = await getLikesRepository().createQueryBuilder('like')
		.where('like.userId = :userId', { userId })
		.andWhere('like.postId IS NULL')
		.andWhere('like.commentId IS NOT NULL')
		.getMany();

		return { listOfComments, likedComments };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const remove = async (commentId: number) => {
    try {
        return await getCommentRepository().delete(commentId);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export default {
	create,
	getCommentsForPost,
    remove
};
