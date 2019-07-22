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
const LOG_OUT = '/logOut';
const USER = '/user';
const PROJECT = '/project';
const TO_DO_LIST = '/toDoList';
const TO_DO = '/toDo';
const MEMO = '/memo';

const READ = '/read';
const CREATE = '/create';
const DELETE = '/delete';
const PATCH = '/patch';

const PARAMS_ID = '/:id';
const PARAMS_TITLE = '/:title';

export default {
  home: HOME,
  // auth
  auth: AUTH,
  failure: FAILURE,
  logIn: LOGIN,
  register: REGISTER,
  // user
  me: ME,
  logOut: LOG_OUT,
  user: USER,
  // db
  project: PROJECT,
  toDoList: TO_DO_LIST,
  toDo: TO_DO,
  memo: MEMO,
  // db-common
  read: READ,
  create: CREATE,
  delete: DELETE,
  patch: PATCH,
  paramsId: PARAMS_ID,
  paramsTitle: PARAMS_TITLE,
};
// const DB = '/db';
// const AUTHO = '/autho';
