import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import LoginService from '../services/LoginService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    console.log('POST /login called');

	const { username, password } = req.body;

	if (!username && !password) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Username and Password are required!'
		});
	}

	if (!username) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Username is required!'
		});
	}

	if (!password) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Password is required!'
		});
	}

	try {
		if (username.trim() === '' && password.trim() === '') {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: 'You have to fill both username and password fields!'
			});
		} else if (username.trim() === '') {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: 'Username is required!'
			});
		} else if (password.trim() === '') {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: 'Password is required!'
			});
		}

		const user = await LoginService.authenticate(username, password);

		if (user) {
			const accessToken = sign(
				{ id: user.id },
				`${process.env.ACCESS_TOKEN_SECRET}`
			);

			return res.status(StatusCodes.OK).json({
				token: accessToken,
				username: username,
				id: user.id
			});
		}
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Wrong username or password!'
		});
	}
});

export default router;
