import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import LikesService from '../services/LikesService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    console.log('POST /like called');
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const currentLike = await LikesService.handlePostLike(postId, userId);

        return res.status(StatusCodes.OK).json(currentLike);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error
        });
    }
});

router.post('/comment', async (req: Request, res: Response) => {
    console.log('POST /like/comment called');
    const { commentId } = req.body;
    const userId = req.user.id;

    try {
        const currentLike = await LikesService.handleCommentLike(commentId, userId);

        return res.status(StatusCodes.OK).json(currentLike);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error
        });
    }
});

export default router;
