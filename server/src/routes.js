/**
-- v1
[x] /auth/logIn
[x] /auth/register

[x] /me
[x] /me/project
[x] /me/toDoList
[x] /me/toDo

-- v2
/user
/user/:id
/user/:id/project
/user/:id/toDoList
/uesr/:id/toDo

/project
/toDoList
/toDo
 */
const HOME = '/';

const AUTH = '/auth';
const FAILURE = '/failure';
const LOGIN = '/logIn';
const REGISTER = '/register';

const ME = '/me';
const USER = '/user';
const PROJECT = '/project';
const TO_DO_LIST = '/toDoList';
const TO_DO = '/toDo';

const READ = '/read';
const CREATE = '/create';
const DELETE = '/delete';
const PATCH = '/patch';
const PARAMS_ID = '/:id';

export default {
  home: HOME,
  // auth
  auth: AUTH,
  failure: FAILURE,
  logIn: LOGIN,
  register: REGISTER,
  // user
  me: ME,
  user: USER,
  // db
  project: PROJECT,
  toDo: TO_DO,
  toDoList: TO_DO_LIST,
  // db-common
  read: READ,
  create: CREATE,
  delete: DELETE,
  patch: PATCH,
  paramsId: PARAMS_ID,
};
// const DB = '/db';
// const AUTHO = '/autho';
