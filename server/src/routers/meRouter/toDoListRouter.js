import express from 'express';
import routes from 'routes';
import {
  readFromProject,
  createNPush,
  deleteOne,
  deleteMany,
} from 'controllers/meController/toDoListController';
import { onlyPrivate } from 'middlewares/user';

const Router = express.Router();
Router.get(routes.readFromProject, onlyPrivate, readFromProject);
Router.post(routes.createNPush, onlyPrivate, createNPush);
Router.delete(routes.deleteOne, onlyPrivate, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);
export default Router;
