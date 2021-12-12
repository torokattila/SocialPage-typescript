import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	console.log('POST /register called');
	
	let { username, password } = req.body;
	username = username.trim();
	password = password.trim();

	if (username === '' && password === '') {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: 'Please fill all the input fields!' });
	} else if (username === '') {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: 'Username field is required!' });
	} else if (password === '') {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Password field is required!'
		});
	} else {
		const user: User | undefined = await UserService.getByUsername(
			username
		);

		if (user) {
			return res.status(StatusCodes.BAD_REQUEST).send({
				error:
					'This username is already exist, please choose another username!'
			});
		} else {
			const newUser = await UserService.create(username, password);

			if (!newUser) {
				console.log('There was an error with the registration!');
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: 'There was an error with the registration!'
				});
			} else {
				const secret: string | undefined =
					process.env.ACCESS_TOKEN_SECRET;

				if (secret) {
					const accessToken = sign(
						{
							id: newUser.id
						},
						secret
					);

					return res.status(StatusCodes.CREATED).json({
						token: accessToken,
						username,
						id: newUser.id
					});
				}
			}
		}
	}
});

export default router;
