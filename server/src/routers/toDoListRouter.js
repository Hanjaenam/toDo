import express from 'express';
import routes from 'routes';
import { onlyProjectCreator } from 'middlewares/project';
import { onlyPrivate } from 'middlewares/user';
import {
  readFromProjectPopulate,
  create,
  deleteOne,
  deleteMany,
} from 'controllers/toDoListController';

const toDoListRouter = express.Router();

toDoListRouter.get(
  routes.readId,
  onlyPrivate,
  onlyProjectCreator,
  readFromProjectPopulate,
);
toDoListRouter.post(routes.create, onlyPrivate, onlyProjectCreator, create);
toDoListRouter.delete(
  routes.deleteOne,
  onlyPrivate,
  onlyProjectCreator,
  deleteOne,
);
toDoListRouter.delete(routes.deleteMany, onlyPrivate, deleteMany);

export default toDoListRouter;
