import { Map, List, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import { projectAPI } from 'lib/API';

const CREATE_PROJECT = 'detailProject/CREATE_PROJECT';
const INIT_PROJECT_DATA_TEMPLATE = 'detailProject/INIT_PROJECT_DATA_TEMPLATE';
const SET_PROJECT_DATA_TEMPLATE = 'detailProject/SET_PROJECT_DATA_TEMPLATE';
const GET_PROJECT_DATA = 'detailProject/GET_PROJECT_DATA';

export const createProject = createAction(CREATE_PROJECT, projectAPI.create);
export const initProjectDataTemplate = createAction(INIT_PROJECT_DATA_TEMPLATE);
export const setProjectDataTemplate = createAction(SET_PROJECT_DATA_TEMPLATE);
export const getProjectData = createAction(
  GET_PROJECT_DATA,
  projectAPI.readOne,
);

const initialState = Map({
  dataTemplate: Map({ isPublic: true, importance: 1, title: '' }),
  data: Map({}),
  toDoListGroupByDate: List([]),
});

const reducer = handleActions(
  {
    [INIT_PROJECT_DATA_TEMPLATE]: (state, _) => {
      return state.set(
        'dataTemplate',
        Map({ title: '', isPublic: true, importance: 1 }),
      );
    },
    [SET_PROJECT_DATA_TEMPLATE]: (state, action) => {
      const { type, value, isPublic, importance, title } = action.payload;
      switch (type) {
        case 'isPublic':
          return state.setIn(['dataTemplate', 'isPublic'], value);
        case 'importance':
          return state.setIn(['dataTemplate', 'importance'], value);
        case 'title':
          return state.setIn(['dataTemplate', 'title'], value);
        case 'all': {
          return state.set(
            'dataTemplate',
            Map({
              isPublic,
              importance,
              title,
            }),
          );
        }
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
    type: GET_PROJECT_DATA,
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
