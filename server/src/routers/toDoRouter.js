import express from 'express';
import routes from 'routes';
import { onlyPrivate } from 'middlewares/auth';
import { onlyCreator, onlyNotCompleted } from 'middlewares/toDo';
import { onlyCreator as onlyListCreator } from 'middlewares/toDoList';
import { add, remove, patch, completed } from 'controllers/toDoController';

const toDoRouter = express.Router();

toDoRouter.post(routes.add, onlyPrivate, onlyListCreator, add);
toDoRouter.delete(routes.delete, onlyPrivate, onlyCreator, remove);
toDoRouter.patch(
  routes.patch,
  onlyCreator,
  onlyCreator,
  onlyNotCompleted,
  patch,
);
toDoRouter.patch(
  routes.completed,
  onlyPrivate,
  onlyCreator,
  onlyNotCompleted,
  completed,
);

export default toDoRouter;
