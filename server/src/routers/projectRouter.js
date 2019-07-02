import express from 'express';
import routes from 'routes';
import {
  readAll,
  add,
  deleteOne,
  patch,
  completed,
  deleteMany,
} from 'controllers/projectController';
import { onlyPrivate } from 'middlewares/auth';
import { onlyCreator, onlyNotCompleted } from 'middlewares/project';

const Router = express.Router();
Router.get(routes.readAll, onlyPrivate, readAll);
Router.post(routes.add, onlyPrivate, add);
Router.delete(routes.delete, onlyPrivate, onlyCreator, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);
// patch는 body data를 넣지 못합니다.
Router.patch(routes.patch, onlyPrivate, onlyCreator, onlyNotCompleted, patch);
Router.patch(
  routes.completed,
  onlyPrivate,
  onlyCreator,
  onlyNotCompleted,
  completed,
);

export default Router;
