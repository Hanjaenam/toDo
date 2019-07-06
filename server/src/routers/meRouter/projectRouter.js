import express from 'express';
import routes from 'routes';
import {
  readAll,
  create,
  deleteOne,
  deleteMany,
  patch,
} from 'controllers/meController/projectController';
import { onlyPrivate } from 'middlewares/user';

const Router = express.Router();
Router.get(routes.read, onlyPrivate, readAll);
Router.post(routes.create, onlyPrivate, create);
Router.delete(routes.deleteOne, onlyPrivate, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);
Router.patch(routes.patch, onlyPrivate, patch);

export default Router;
