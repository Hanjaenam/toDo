import express from 'express';
import routes from 'routes';
import { register, logIn, failure } from 'controllers/authController';

const authRouter = express.Router();
// authentication
authRouter.post(routes.logIn, logIn);
authRouter.post(routes.register, register);
authRouter.get(routes.failure, failure);

export default authRouter;
