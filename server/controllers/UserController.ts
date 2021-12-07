import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

const router = Router();

router.put('/changecredentials', async (req: Request, res: Response) => {
    console.log('PUT /changecredentials called');
    const { newUsername, oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        if (newUsername === '' && (oldPassword === '' || newPassword === '')) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'You have to fill both old password and new password fields!',
            });
        }

        await UserService.updateCredentials(userId, newUsername, oldPassword, newPassword);

        return res.status(StatusCodes.OK).json({
            successMessage: 'Successful update!',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'There was an error with the update!',
        });
    }
});

router.delete('/', async (req: Request, res: Response) => {
    console.log('DELETE /users called');
    const userId = req.user.id;
    
    try {
        await UserService.remove(userId);

        return res.status(StatusCodes.OK).json('Profile deleted!');
    } catch (error: any) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'There is no user with this ID',
        });
    }
});

export default router;