import express from 'express';
import routes from 'routes';
import { add, remove, patch, completed } from 'controllers/toDoListController';
import { onlyPrivate } from 'middlewares/auth';
import { onlyCreator, onlyNotCompleted } from 'middlewares/toDoList';

const toDoListRouter = express.Router();
toDoListRouter.post(routes.add, onlyPrivate, add);
toDoListRouter.delete(routes.delete, onlyPrivate, onlyCreator, remove);
// patch는 body data를 넣지 못합니다.
toDoListRouter.patch(
  routes.patch,
  onlyPrivate,
  onlyCreator,
  onlyNotCompleted,
  patch,
);
toDoListRouter.patch(
  routes.completed,
  onlyPrivate,
  onlyCreator,
  onlyNotCompleted,
  completed,
);

export default toDoListRouter;
