import express from 'express';
import { createConnection } from 'typeorm';
require('dotenv').config();
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './entities/User';
import Post from './entities/Post';
import Comment from './entities/Comment';
import Like from './entities/Like';
import { validateToken } from './middlewares/AuthMiddleware';
import AuthController from './controllers/AuthController';
import RegistrationController from './controllers/RegistrationController';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const init = async () => {
	try {
		await createConnection({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User, Post, Like, Comment],
            synchronize: true
		});

		app.use(
			cors({
				origin: ['http://localhost:3000'],
				methods: ['GET', 'POST', 'PUT', 'DELETE']
			})
		);

		app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/api/auth', validateToken, AuthController);
        app.use('/api/register', RegistrationController);

        app.listen(PORT, () => {
            console.log(`App is running at PORT ${PORT}`);
        });

	} catch (error) {
		console.log(error);
		throw new Error(
			'Something went wrong with the initialization: ' + error
		);
	}
};

init();
