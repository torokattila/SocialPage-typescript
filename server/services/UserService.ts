import User from '../entities/User';
import { getConnection, getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

export type UserAttributes = {
    id: number;
    username: string;
    password: string;
}

const getUserRepository = () => getConnection().getRepository(User);

const getByUsername = async (username: string): Promise<User | undefined> => {
    let response: User | undefined;

    try {
        response = await getUserRepository().findOne({
            where: {
                username
            }
        });
    } catch (error: any) {
        console.log(error);
    }

    return response;
}

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
}

export default {
    getByUsername,
    create
}