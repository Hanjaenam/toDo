import express from 'express';
import routes from 'routes';
import {
  register,
  logIn,
  getUser,
  failurePassport,
} from 'controllers/authController';

const userRouter = express.Router();
userRouter.get(routes.getUser, getUser);
userRouter.get(routes.failurePassport, failurePassport);
userRouter.post(routes.logIn, logIn);
userRouter.post(routes.register, register);

export default userRouter;
