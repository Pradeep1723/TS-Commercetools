import { Router } from 'express';
import { registerUserController } from '../controllers/registerUser.controller';

const router = Router();

router.post('/sign-up', registerUserController);

export default router;
