import express from 'express';
import routes from 'routes';
import {
  readFromUserPopulate,
  create,
  deleteOne,
  patch,
  completed,
  deleteMany,
} from 'controllers/projectController';
import { onlyPrivate } from 'middlewares/user';
import { onlyProjectCreator, onlyNotCompleted } from 'middlewares/project';

const Router = express.Router();

Router.get(routes.read, onlyPrivate, readFromUserPopulate);
Router.post(routes.create, onlyPrivate, create);
Router.delete(routes.deleteOne, onlyPrivate, onlyProjectCreator, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);
// patch는 body data를 넣지 못합니다.
Router.patch(
  routes.patch,
  onlyPrivate,
  onlyProjectCreator,
  onlyNotCompleted,
  patch,
);
Router.patch(
  routes.completed,
  onlyPrivate,
  onlyProjectCreator,
  onlyNotCompleted,
  completed,
);

export default Router;
