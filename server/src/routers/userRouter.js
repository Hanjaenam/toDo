import express from 'express';
import routes from 'routes';
import {
  register,
  logIn,
  getInfo,
  failurePassport,
} from 'controllers/userController';

const userRouter = express.Router();
// authentication
userRouter.get(routes.getInfo, getInfo);
userRouter.get(routes.failurePassport, failurePassport);
userRouter.post(routes.logIn, logIn);
userRouter.post(routes.register, register);

export default userRouter;
