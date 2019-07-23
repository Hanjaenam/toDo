import express from 'express';
import routes from 'routes';
import {
  readAll,
  readOne,
  create,
  deleteOne,
  patch,
} from 'controllers/meController/projectController';

const Router = express.Router();
Router.get(routes.home, readAll);
// paramsId -> "/:id" : search위로 올려버리면 "/search"를 "/:id"로 인식하게되어 readOne이 호출된다.
Router.get(routes.paramsId, readOne);
Router.post(routes.create, create);
Router.delete(routes.delete + routes.paramsId, deleteOne);
Router.patch(routes.patch + routes.paramsId, patch);

export default Router;
