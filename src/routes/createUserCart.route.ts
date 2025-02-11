import { Router } from 'express';
import { createUserCartController } from '../controllers/createUserCart.controller';

const router = Router();

router.post('/create-cart', createUserCartController);

export default router;
