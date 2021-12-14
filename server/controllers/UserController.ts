import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    console.log(`GET /users/${req.params.id} called`);
    const userId = req.params.id;

    try {
        const user = await UserService.getById(Number(userId));

        return res.status(StatusCodes.OK).send(user);
    } catch (error: any) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

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
        console.log(error.message);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
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