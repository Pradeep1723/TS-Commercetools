import { Router } from 'express';
import { loginUserController } from '../controllers/loginUser.controller';

const router = Router();

router.post('/login', loginUserController);

export default router;
