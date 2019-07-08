import express from 'express';
import routes from 'routes';
import {
  readAll,
  create,
  deleteOne,
  deleteMany,
  patch,
} from 'controllers/meController/projectController';

const Router = express.Router();
Router.get(routes.home, readAll);
Router.post(routes.create, create);
Router.delete(routes.delete, deleteMany);
Router.delete(routes.delete + routes.paramsId, deleteOne);
Router.patch(routes.patch + routes.paramsId, patch);

export default Router;
