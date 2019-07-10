import express from 'express';
import routes from 'routes';
import { getInfo } from 'controllers/meController';
import projectRouter from './projectRouter';
import toDoRouter from './toDoRouter';
import memoRouter from './memoRouter';

const Router = express.Router();

Router.get(routes.home, getInfo);
Router.use(routes.project, projectRouter);
Router.use(routes.toDo, toDoRouter);
Router.use(routes.memo, memoRouter);

export default Router;
