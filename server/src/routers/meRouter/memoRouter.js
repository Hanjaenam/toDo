import express from 'express';
import routes from 'routes';
import {
  readAllFromToDo,
  create,
  deleteOne,
  deleteMany,
  patch,
} from 'controllers/meController/memoController';

const Router = express.Router();

Router.get(routes.paramsId, readAllFromToDo);
Router.post(routes.create + routes.paramsId, create);
Router.delete(routes.delete + routes.paramsId, deleteOne);
Router.delete(routes.delete, deleteMany);
Router.patch(routes.patch + routes.paramsId, patch);

export default Router;
