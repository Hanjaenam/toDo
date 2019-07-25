import { Map, List, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import { projectAPI } from 'lib/API';

const CREATE_PROJECT = 'project/CREATE_PROJECT';
const INIT_PROJECT_DATA = 'project/INIT_PROJECT_DATA';
const GET_PROJECT = 'project/GET_PROJECT';
const SET_PROJECT_DATA = 'project/SET_PROJECT_DATA';

export const createProject = createAction(CREATE_PROJECT, projectAPI.create);
export const initProjectData = createAction(INIT_PROJECT_DATA);
export const getProject = createAction(GET_PROJECT, projectAPI.readOne);
export const setProjectData = createAction(SET_PROJECT_DATA);

const initialState = Map({
  data: Map({ title: '', isPublic: true, importance: 1 }),
  toDoListGroupByDate: List([]),
});

const reducer = handleActions(
  {
    [INIT_PROJECT_DATA]: (_, __) => {
      return initialState;
    },
    [SET_PROJECT_DATA]: (state, action) => {
      const { type, value } = action.payload;
      switch (type) {
        case 'isPublic':
          return state.setIn(['data', 'isPublic'], value);
        case 'importance':
          return state.setIn(['data', 'importance'], value);
        case 'title':
          return state.setIn(['data', 'title'], value);
        default:
          return state;
      }
    },
  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: CREATE_PROJECT,
    onSuccess: (state, action) => {
      const {
        payload: { data },
      } = action;
      return state.set('data', fromJS(data));
    },
  },
  {
    type: GET_PROJECT,
    onSuccess: (state, action) => {
      const {
        payload: {
          data: { project, toDoListGroupByDate },
        },
      } = action;
      return state
        .set('data', fromJS(project))
        .set('toDoListGroupByDate', fromJS(toDoListGroupByDate));
    },
  },
]);
