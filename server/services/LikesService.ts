import Like from '../entities/Like';
import { getConnection, getRepository } from 'typeorm';

export type LikeResultType = {
	isLiked: boolean;
};

export const getLikesRepository = () => getConnection().getRepository(Like);

const handlePostLike = async (
	postId: number,
	userId: number
): Promise<LikeResultType> => {
	try {
		const currentLike = await getLikesRepository()
			.createQueryBuilder('likes')
			.where({ postId })
			.andWhere({ userId })
			.getOne();

		if (currentLike) {
			await getLikesRepository()
				.createQueryBuilder('likes')
				.delete()
				.where({ postId })
				.andWhere({ userId })
				.execute();

			return { isLiked: false };
		} else {
			await getLikesRepository()
				.createQueryBuilder('likes')
				.insert()
				.into(Like)
				.values([{ postId, userId }])
				.execute();

			return { isLiked: true };
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const handleCommentLike = async (commentId: number, userId: number): Promise<LikeResultType> => {
    try {
		const currentLike = await getLikesRepository()
			.createQueryBuilder('likes')
			.where({ commentId })
			.andWhere({ userId })
			.getOne();

		if (currentLike) {
			await getLikesRepository()
				.createQueryBuilder('likes')
				.delete()
				.where({ commentId })
				.andWhere({ userId })
				.execute();

			return { isLiked: false };
		} else {
			await getLikesRepository()
				.createQueryBuilder('likes')
				.insert()
				.into(Like)
				.values([{ commentId, userId }])
				.execute();

			return { isLiked: true };
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export default {
	handlePostLike,
    handleCommentLike
};
