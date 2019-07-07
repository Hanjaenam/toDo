import express from 'express';
import routes from 'routes';
import { getInfo } from 'controllers/meController';
import projectRouter from './projectRouter';
// import toDoListRouter from './toDoListRouter';
import toDoRouter from './toDoRouter';

const Router = express.Router();

Router.get(routes.home, getInfo);
Router.use(routes.project, projectRouter);
Router.use(routes.toDo, toDoRouter);
// Router.use(routes.toDoList, toDoListRouter);

export default Router;
