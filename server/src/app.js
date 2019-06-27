import config from 'config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import initPassport from 'config/passport';
import routes from 'routes';
import { authRouter, toDoListRouter, toDoRouter } from 'routers';

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
initPassport();
app.use(routes.auth, authRouter);
app.use(routes.toDoList, toDoListRouter);
app.use(routes.toDo, toDoRouter);

console.log('complete setting app');

export default app;
