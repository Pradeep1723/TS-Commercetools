import express from 'express';
import cors from 'cors';
import productsRoute from './src/routes/getProducts.route.ts';
import registerUserRoute from './src/routes/registerUser.route.ts';
import loginUserRoute from './src/routes/loginUser.route.ts';
import logoutUserRoute from './src/routes/logoutUser.route.ts';
import verifyEmailRoute from './src/routes/verifyEmail.route.ts';
import getMyActiveCartRoute from './src/routes/getUserCart.route.ts';
import createMyCartRoute from './src/routes/createUserCart.route.ts';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productsRoute);
app.use('/user', registerUserRoute);
app.use('/user', loginUserRoute);
app.use('/user', logoutUserRoute);
app.use('/user/api', verifyEmailRoute);
app.use('/user/api/carts', getMyActiveCartRoute);
app.use('/user/api/carts', createMyCartRoute);
// app.use('/user/api/carts');
// app.use('/user/api/carts');
// app.use('/user/api/carts');
// app.use('/user/api/carts');

export default app;
