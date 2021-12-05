import User from '../entities/User';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	const userId = req.user.id;

	const user = await User.findOne(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });
	} else {
        res.status(StatusCodes.OK).json({
            user: req.user,
            username: user.username
        });
    }
});

export default router;
