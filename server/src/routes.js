const AUTH = '/auth';
const GET_USER = '/getUser';
const FAILURE_PASSPORT = '/failurePassport';
const LOGIN = '/logIn';
const REGISTER = '/register';

const PROJECT = '/project';
const TO_DO = '/toDo';
const READ_ALL = '/readAll';
const READ_ONE = '/readOne/:id';
const ADD = '/add';
const DELETE = '/delete/:id';
const DELETE_MANY = '/deleteMany';
const PATCH = '/patch/:id';
const COMPLETED = '/completed/:id';

export default {
  auth: AUTH,
  getUser: GET_USER,
  failurePassport: FAILURE_PASSPORT,
  logIn: LOGIN,
  register: REGISTER,
  project: PROJECT,
  toDo: TO_DO,
  readAll: READ_ALL,
  readOne: READ_ONE,
  add: ADD,
  delete: DELETE,
  deleteMany: DELETE_MANY,
  patch: PATCH,
  completed: COMPLETED,
};
