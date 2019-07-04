const USER = '/user';
const GET_INFO = '/getInfo';
const FAILURE_PASSPORT = '/failurePassport';
const LOGIN = '/logIn';
const REGISTER = '/register';

const PROJECT = '/project';
const TO_DO = '/toDo';
const TO_DO_LIST = '/toDoList';

const READ = '/read';
const READ_ID = '/read/:id';
const READ_ALL = '/readAll';
const READ_ONE = '/readOne/:id';
const CREATE = '/create';
const DELETE_ONE = '/delete/:id';
const DELETE_MANY = '/deleteMany';
const PATCH = '/patch/:id';
const COMPLETED = '/completed/:id';

export default {
  user: USER,
  getInfo: GET_INFO,
  failurePassport: FAILURE_PASSPORT,
  logIn: LOGIN,
  register: REGISTER,
  // db: DB,
  project: PROJECT,
  toDo: TO_DO,
  toDoList: TO_DO_LIST,

  // autho: AUTHO,
  read: READ,
  readId: READ_ID,
  readAll: READ_ALL,
  readOne: READ_ONE,
  create: CREATE,
  deleteOne: DELETE_ONE,
  deleteMany: DELETE_MANY,
  patch: PATCH,
  completed: COMPLETED,
};
// const DB = '/db';
// const AUTHO = '/autho';
