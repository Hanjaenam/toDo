import express from 'express';
import routes from 'routes';
import { onlyPrivate } from 'middlewares/auth';
import {
  onlyCreator as onlyToDoCreator,
  onlyNotCompleted,
} from 'middlewares/toDo';
import { onlyCreator as onlyProjectCreator } from 'middlewares/project';
import {
  readAll,
  add,
  deleteOne,
  patch,
  completed,
} from 'controllers/toDoController';

const toDoRouter = express.Router();

toDoRouter.get(routes.readAll, onlyPrivate, readAll);
toDoRouter.post(routes.add, onlyPrivate, onlyProjectCreator, add);
toDoRouter.delete(routes.delete, onlyPrivate, onlyToDoCreator, deleteOne);
toDoRouter.patch(routes.patch, onlyToDoCreator, onlyNotCompleted, patch);
toDoRouter.patch(
  routes.completed,
  onlyPrivate,
  onlyToDoCreator,
  onlyNotCompleted,
  completed,
);

export default toDoRouter;
