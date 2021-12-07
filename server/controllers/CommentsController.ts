import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentsService from '../services/CommentsService';

const router = Router();

export type CommentAttributes = {
	postId: number;
	username: string;
	content: string;
};

router.post('/', async (req: Request, res: Response) => {
	console.log('POST /comments called');

	const comment = req.body;

	if (comment.commentContent === '') {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Add somt text to the comment!'
		});
	}

	try {
		const createdComment: CommentAttributes = await CommentsService.create(
			comment.postId,
			req.user.id,
			comment.username,
			comment.commentContent
		);

		if (!createdComment) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Something went wrong with the comment creation!'
			});
		} else {
			return res.status(StatusCodes.OK).json(createdComment);
		}
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error
		});
	}
});

router.get('/:postId', async (req: Request, res: Response) => {
    console.log(`GET /comments/${req.params.postId} called`);
	const postId = req.params.postId;
	const userId = req.user.id;

	try {
		const resultComments = await CommentsService.getCommentsForPost(
			Number(postId),
			userId
		);

		if (!resultComments) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'There was an error with getting comments'
			});
		} else {
			return res.status(StatusCodes.OK).json(resultComments);
		}
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error
		});
	}
});

router.delete('/:commentId', async (req: Request, res: Response) => {
    console.log(`DELETE /comments/${req.params.commentId} called`);
    const commentId = req.params.commentId;

    try {
		await CommentsService.remove(Number(commentId));

		return res.status(StatusCodes.OK).json('Comment deleted!');
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error:
				'There was an error with deleting this comment, try again please!'
		});
	}
});

export default router;
