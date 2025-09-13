import { Request, Response } from 'express';
import { usersService } from '../services/index.js';

class UsersController {
    async getAllUsers(req: Request, res: Response): Promise<Response | void> {
        try {
            const users = await usersService.getAll();
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            return res.status(500).send(`Ha ocurrido un error en la petición, detalle del error: ${error}`);
        }
    }

    async getUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const userId = req.params.uid;
            const user = await usersService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ status: 'error', error: 'User not found' });
            }
            return res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            return res.status(500).send(`Ha ocurrido un error en la petición, detalle del error: ${error}`);
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const updateBody = req.body;
            const userId = req.params.uid;
            const user = await usersService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ status: 'error', error: 'User not found' });
            }
            const result = await usersService.update(userId, updateBody);
            return res.status(200).json({ status: 'success', message: 'User updated' });
        } catch (error) {
            return res.status(500).send(`Ha ocurrido un error en la petición, detalle del error: ${error}`);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const userId = req.params.uid;
            const user = await usersService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ status: 'error', error: 'User not found' });
            }
            const result = await usersService.delete(user);
            return res.status(200).json({ status: 'success', message: 'User deleted' });
        } catch (error) {
            return res.status(500).send(`Ha ocurrido un error en la petición, detalle del error: ${error}`);
        }
    }
}

export const usersController = new UsersController();