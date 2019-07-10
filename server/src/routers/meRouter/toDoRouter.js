import express from 'express';
import {
  readAllFromProject,
  create,
  deleteOne,
  deleteMany,
  patch,
} from 'controllers/meController/toDoController';
import routes from 'routes';

const Router = express.Router();

Router.get(routes.paramsId, readAllFromProject);
Router.post(routes.create + routes.paramsId, create);
Router.delete(routes.delete + routes.paramsId, deleteOne);
Router.delete(routes.delete, deleteMany);
Router.patch(routes.patch + routes.paramsId, patch);

export default Router;
