import User from '../entities/User';
import UserService from './UserService';
import { verifyPassword } from '../common/PasswordHelper';

const authenticate = async (username: string, password: string): Promise<User | null> => {
    const user = await UserService.getByUsername(username);

    if (!user) {
        throw new Error('wrong_username_or_password');
    }

    try {
        const verified = await verifyPassword(password, user.password);

        if (verified) {
            return user;
        }

        throw new Error('wrong_username_or_password');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export default { authenticate };
