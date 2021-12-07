import User from '../entities/User';
import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import { verifyPassword } from '../common/PasswordHelper';

const getUserRepository = () => getConnection().getRepository(User);

const getByUsername = async (username: string): Promise<User | undefined> => {
	let response: User | undefined;

	try {
		response = await getUserRepository().findOne({
			where: {
				username
			}
		});
	} catch (error) {
		console.log(error);
	}

	return response;
};

const create = async (username: string, password: string): Promise<User> => {
	const userEntity = getUserRepository().create();
	userEntity.createdAt = new Date();
	userEntity.username = username;
	userEntity.password = await bcrypt.hash(password, 10);

	try {
		await getUserRepository().save(userEntity);

		return userEntity;
	} catch (error) {
		throw new Error('User has not been created');
	}
};

const updateCredentials = async (userId: number, username: string, oldPassword: string, newPassword: string): Promise<User> => {
    const userEntity = await getUserRepository().findOne(userId);

    if (!userEntity) {
        throw new Error('User not found!');
    }

    if (username !== '' && newPassword !== '') {
        const verified = await verifyPassword(oldPassword, userEntity.password);

        if (!verified) {
            throw new Error('wrong_old_password');
        }

        userEntity.username = username;
        userEntity.password = await bcrypt.hash(newPassword, 10);
    } else if (username !== '' && newPassword === '') {
        userEntity.username = username;
    } else if (username === '' && newPassword !== '') {
        const verified = await verifyPassword(oldPassword, userEntity.password);

        if (!verified) {
            throw new Error('wrong_old_password');
        }

        userEntity.password = await bcrypt.hash(newPassword, 10);
    }
    
    await getUserRepository().save(userEntity);

    return userEntity;
};

const remove = async (userId: number): Promise<void> => {
    try {
        await getUserRepository().delete(userId);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export default {
	getByUsername,
	create,
    updateCredentials,
    remove
};
