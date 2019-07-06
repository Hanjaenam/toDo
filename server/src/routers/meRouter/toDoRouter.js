import express from 'express';
import {
  createNPush,
  deleteOne,
  deleteMany,
} from 'controllers/meController/toDoController';
import { onlyPrivate } from 'middlewares/user';
import routes from 'routes';

const Router = express.Router();

Router.post(routes.createNPush, onlyPrivate, createNPush);
Router.delete(routes.deleteOne, onlyPrivate, deleteOne);
Router.delete(routes.deleteMany, onlyPrivate, deleteMany);

export default Router;
