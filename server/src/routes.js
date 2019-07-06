const USER = '/user';
const GET_INFO = '/getInfo';
const FAILURE_PASSPORT = '/failurePassport';
const LOGIN = '/logIn';
const REGISTER = '/register';

const ME = '/me';
const PROJECT = '/project';

const TO_DO_LIST = '/toDoList';
const READ_FROM_PROJECT = '/readFromProject/:projectId';

const TO_DO = '/toDo';

const READ_ALL = '/read';
const CREATE = '/create';
const CREATE_N_PUSH = '/create/:id';
const DELETE_ONE = '/delete/:id';
const DELETE_MANY = '/delete';
const PATCH = '/patch/:id';
// ----
const READ_ONE = '/read/:id';
const COMPLETED = '/completed/:id';

export default {
  // user
  user: USER,
  getInfo: GET_INFO,
  failurePassport: FAILURE_PASSPORT,
  logIn: LOGIN,
  register: REGISTER,
  me: ME,
  // db
  project: PROJECT,
  toDo: TO_DO,
  toDoList: TO_DO_LIST,
  readFromProject: READ_FROM_PROJECT,
  // db-common
  readAll: READ_ALL,
  readOne: READ_ONE,
  create: CREATE,
  createNPush: CREATE_N_PUSH,
  deleteOne: DELETE_ONE,
  deleteMany: DELETE_MANY,
  patch: PATCH,
  completed: COMPLETED,
};
// const DB = '/db';
// const AUTHO = '/autho';
