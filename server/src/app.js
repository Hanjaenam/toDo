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
import { authRouter, meRouter } from 'routers';
import { onlyPrivate, onlyPublic } from 'middlewares/auth';
// import ToDo from 'models/ToDo';

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

app.use(routes.auth, onlyPublic, authRouter);
app.use(routes.me, onlyPrivate, meRouter);

console.log('complete setting app');

export default app;
