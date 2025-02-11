import { Router } from 'express';
import { fetchAllProductsController } from '../controllers/getProducts.controller.ts';

const router = Router();

router.get('/get-all-products', fetchAllProductsController);

export default router;
