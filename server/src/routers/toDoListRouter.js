import express from 'express';
import routes from 'routes';
import {} from 'controllers/toDoListController';

const Router = express.Router();

Router.get(routes.readAll);
Router.get(routes.readOne);
Router.post(routes.create);
Router.delete(routes.deleteOne);
Router.delete(routes.deleteMany);
