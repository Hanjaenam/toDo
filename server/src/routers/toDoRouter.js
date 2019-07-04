import express from 'express';
import routes from 'routes';
import { onlyPrivate } from 'middlewares/user';
import { onlyToDoCreator, onlyNotCompleted } from 'middlewares/toDo';
import { onlyProjectCreator } from 'middlewares/project';
import {
  readAll,
  add,
  deleteOne,
  patch,
  completed,
} from 'controllers/toDoController';

const toDoRouter = express.Router();

toDoRouter.get(routes.readAll, onlyPrivate, readAll);
toDoRouter.post(routes.create, onlyPrivate, onlyProjectCreator, add);
toDoRouter.delete(routes.deleteOne, onlyPrivate, onlyToDoCreator, deleteOne);
toDoRouter.patch(routes.patch, onlyToDoCreator, onlyNotCompleted, patch);
toDoRouter.patch(
  routes.completed,
  onlyPrivate,
  onlyToDoCreator,
  onlyNotCompleted,
  completed,
);

export default toDoRouter;
