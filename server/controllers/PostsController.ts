import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostsService from '../services/PostsService';

export type PostAttributes = {
	title: string;
	content: string;
	username: string;
};

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	console.log('POST /posts called');

	const post: PostAttributes = req.body;
	const user = req.user;
	const username = req.body.username;

	if (!post.content) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Post must have a content!'
		});
	}

	try {
		const createdPost = await PostsService.create(
			post.title,
			post.content,
			user,
			username
		);

		if (!createdPost) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Something went wrong with the post creation!'
			});
		} else {
			return res.status(StatusCodes.CREATED).json({
				success: 'Post created!',
				post: createdPost
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error
		});
	}
});

router.get('/', async (req: Request, res: Response) => {
	console.log('GET /posts called');

	const userId = req.user.id;

	try {
		const postsList = await PostsService.list(userId);

		if (postsList) {
			return res.status(StatusCodes.OK).json(postsList);
		}
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error
		});
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	console.log(`GET /posts/${req.params.id} called`);
	const postId = req.params.id;

	try {
		const currentPost = await PostsService.get(Number(postId));

		if (currentPost) {
			return res.status(StatusCodes.OK).json(currentPost);
		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: 'There is no post with this id!'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error
		});
	}
});

router.put('/title', async (req: Request, res: Response) => {
	console.log('PUT /posts/title called');
	const { newTitle, postId } = req.body;

	try {
		await PostsService.updateTitle(newTitle, postId);

		return res.status(StatusCodes.OK).json('Title has been updated!');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error
		});
	}
});

router.put('/content', async (req: Request, res: Response) => {
	console.log('PUT /posts/content called');
	const { newContent, postId } = req.body;

	try {
		await PostsService.updateContent(newContent, postId);

		return res.status(StatusCodes.OK).json('Content has been updated!');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error
		});
	}
});

router.delete('/:id', async (req: Request, res: Response) => {
	console.log(`DELETE /posts/${req.params.id} called`);
	const { id } = req.params;

	try {
		await PostsService.remove(Number(id));

		return res.status(StatusCodes.OK).json('Post deleted!');
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error:
				'There was an error with deleting this post, try again please!'
		});
	}
});

export default router;
