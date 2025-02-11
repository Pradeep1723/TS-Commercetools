import { getUserActiveCartController } from '../controllers/getUserCart.controller';
import { Router } from 'express';

const router = Router();

router.get('/my-active-cart', getUserActiveCartController);

export default router;
