import Post from '../entities/Post';
import { getConnection } from 'typeorm';
import User from '../entities/User';
import { getLikesRepository } from './LikesService';
import Like from '../entities/Like';

export type PostListType = {
	listOfPosts: Post[];
	likedPosts: Like[];
};

const getPostRepository = () => getConnection().getRepository(Post);

const create = async (
	title: string,
	content: string,
	user: User,
	username: string
): Promise<Post> => {
	const postEntity = getPostRepository().create();
	postEntity.title = title;
	postEntity.content = content;
	postEntity.createdAt = new Date();
	postEntity.user = user;
	postEntity.username = username;

	try {
		await getPostRepository().save(postEntity);

		return postEntity;
	} catch (error) {
		console.log(error);
		throw new Error('Post has not been created');
	}
};

const list = async (userId: number): Promise<PostListType> => {
	try {
		const listOfPosts = await getPostRepository().find({
			relations: ['Likes', 'Comments']
		});
		const likedPosts = await getLikesRepository().find({
			where: { userId }
		});

		return { listOfPosts, likedPosts };
	} catch (error) {
		console.log(error);
		throw new Error('Error with getting posts!');
	}
};

const get = async (postId: number): Promise<Post> => {
	let response: Post | undefined;
	try {
		const currentPost = await getPostRepository().findOne(postId, {
			relations: ['Likes', 'Comments']
		});

		response = currentPost;
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong in getting specific post!');
	}

	if (!response) {
		throw new Error('Post not found');
	}

	return response;
};

const updateTitle = async (title: string, postId: number): Promise<Post> => {
    try {
        const postEntity = await getPostRepository().findOne(postId);

        if (postEntity) {
            postEntity.title = title;
            await getPostRepository().save(postEntity);
            return postEntity;
        } else {
            throw new Error('Post not found!');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const updateContent = async (content: string, postId: number): Promise<Post> => {
    try {
        const postEntity = await getPostRepository().findOne(postId);

        if (postEntity) {
            postEntity.content = content;
            await getPostRepository().save(postEntity);
            return postEntity;
        } else {
            throw new Error('Post not found!');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const remove = async (postId: number) => {
    try {
        return await getPostRepository().delete(postId);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export default {
	create,
	list,
	get,
    updateTitle,
    updateContent,
    remove
};
