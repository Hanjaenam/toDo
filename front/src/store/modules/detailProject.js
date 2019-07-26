import { Map, fromJS, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import { projectAPI, toDoAPI } from 'lib/API';

const CREATE_TO_DO = 'detailProject/CREATE_TO_DO';
const INIT_TO_DO_DATA_TEMPLATE = 'detailProject/INIT_TO_DO_DATA_TEMPLATE';
const GET_PROJECT_DATA = 'detailProject/GET_PROJECT_DATA';
const SET_TO_DO_DATA_TEMPLATE = 'detailProject/SET_TO_DO_DATA_TEMPLATE';
const SET_IS_NEW_TO_DO = 'detailProject/SET_IS_NEW_TO_DO';

export const createToDo = createAction(CREATE_TO_DO, toDoAPI.create);
export const initToDoDataTemplate = createAction(INIT_TO_DO_DATA_TEMPLATE);
export const getProjectData = createAction(
  GET_PROJECT_DATA,
  projectAPI.readOne,
);
export const setIsNewToDo = createAction(SET_IS_NEW_TO_DO);
export const setToDoDataTemplate = createAction(SET_TO_DO_DATA_TEMPLATE);

const initialState = Map({
  dataTemplate: Map({ importance: 1, memo: '', order: undefined, title: '' }),
  isNewToDo: false,
  projectData: Map({}),
  query: Map({
    page: 1,
    q: '',
    sort: 'latest',
  }),
  toDoData: List([]),
});

const reducer = handleActions(
  {
    [INIT_TO_DO_DATA_TEMPLATE]: (state, _) => {
      return state.set(
        'dataTemplate',
        Map({ title: '', memo: '', importance: 1 }),
      );
    },
    [SET_TO_DO_DATA_TEMPLATE]: (state, action) => {
      const {
        type,
        value,
        isPublic,
        importance,
        title,
        order,
      } = action.payload;
      switch (type) {
        case 'memo':
          return state.setIn(['dataTemplate', 'memo'], value);
        case 'importance':
          return state.setIn(['dataTemplate', 'importance'], value);
        case 'title':
          return state.setIn(['dataTemplate', 'title'], value);
        case 'order':
          return state.setIn(['dataTemplate', 'order'], value);
        case 'all': {
          return state.set(
            'dataTemplate',
            Map({
              isPublic,
              importance,
              title,
              order,
            }),
          );
        }
        default:
          return state;
      }
    },
    [SET_IS_NEW_TO_DO]: (state, action) => {
      return state.set('isNewToDo', action.payload);
    },
  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: CREATE_TO_DO,
    onSuccess: (state, action) => {
      const {
        payload: { data },
      } = action;
      return state
        .update('toDoData', item => item.unshift(data))
        .set('isNewToDo', false);
    },
  },
  {
    type: GET_PROJECT_DATA,
    onSuccess: (state, action) => {
      const {
        payload: {
          data: { toDo, ...rest },
        },
      } = action;
      return state
        .set('projectData', fromJS(rest))
        .set('toDoData', fromJS(toDo));
    },
  },
]);
