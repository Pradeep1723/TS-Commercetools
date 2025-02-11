import { Router } from 'express';
import { logoutUserController } from '../controllers/logoutUser.controller';

const router = Router();

router.post('/logout', logoutUserController);

export default router;
