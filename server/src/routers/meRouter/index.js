import express from 'express';
import routes from 'routes';
import projectRouter from './projectRouter';
import toDoListRouter from './toDoListRouter';
import toDoRouter from './toDoRouter';

const Router = express.Router();

Router.use(routes.project, projectRouter);
Router.use(routes.toDoList, toDoListRouter);
Router.use(routes.toDo, toDoRouter);

export default Router;
