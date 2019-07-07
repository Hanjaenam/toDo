import express from 'express';
import routes from 'routes';
import { onlyPrivate } from 'middlewares/auth';
import {
  readAll,
  readOne,
  create,
  deleteOne,
  deleteMany,
  patch,
  readFromProject,
} from 'controllers/v2/toDoController';

const Router = express.Router();

Router.get(routes.readAll, onlyPrivate, readAll);
Router.get(routes.readOne, onlyPrivate, readOne);
Router.get(routes.readFromProject, onlyPrivate, readFromProject);
Router.post(routes.create, onlyPrivate, create);
Router.delete(routes.deleteOne, onlyPrivate, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);
Router.patch(routes.patch, onlyPrivate, patch);

export default Router;
