import express from 'express';
import {
  readFromProject,
  createNPush,
  deleteOne,
  deleteMany,
  patch,
  complete,
} from 'controllers/meController/toDoController';
import routes from 'routes';

const Router = express.Router();

Router.get(routes.paramsId, readFromProject);
Router.post(routes.create + routes.paramsId, createNPush);
Router.delete(routes.delete + routes.paramsId, deleteOne);
Router.delete(routes.delete, deleteMany);
Router.patch(routes.patch + routes.paramsId, patch);
Router.patch(routes.complete + routes.paramsId, complete);

export default Router;