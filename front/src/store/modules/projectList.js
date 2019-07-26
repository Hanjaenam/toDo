import { fromJS, List, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { projectAPI } from 'lib/API';
import { applyPenders } from 'redux-pender';

const CREATE_PROJECT = 'detailProject/CREATE_PROJECT';
const INIT_PROJECT_DATA_TEMPLATE = 'detailProject/INIT_PROJECT_DATA_TEMPLATE';
const READ_ALL_PROJECT = 'projectList/READ_ALL_PROJECT';
const SET_PAGE = 'projectList/SET_PAGE';
const SET_SERACH = 'projectList/SET_SERACH';
const SET_SORT = 'projectList/SET_SORT';
const SET_LAST_PAGE = 'projectList/SET_LAST_PAGE';
const SET_PROJECT_DATA_TEMPLATE = 'detailProject/SET_PROJECT_DATA_TEMPLATE';

export const createProject = createAction(CREATE_PROJECT, projectAPI.create);
export const initProjectDataTemplate = createAction(INIT_PROJECT_DATA_TEMPLATE);
export const readAllProject = createAction(
  READ_ALL_PROJECT,
  projectAPI.readAll,
);
export const setPage = createAction(SET_PAGE);
export const setSearch = createAction(SET_SERACH);
export const setSort = createAction(SET_SORT);
export const setLastPage = createAction(SET_LAST_PAGE);
export const setProjectDataTemplate = createAction(SET_PROJECT_DATA_TEMPLATE);

const initialState = Map({
  data: List([]),
  dataTemplate: Map({ importance: 1, isPublic: true, title: '' }),
  lastPage: 1,
  query: Map({
    page: 1,
    q: '',
    sort: 'latest',
  }),
});

const reducer = handleActions(
  {
    [INIT_PROJECT_DATA_TEMPLATE]: (state, _) => {
      return state.set(
        'dataTemplate',
        Map({ title: '', isPublic: true, importance: 1 }),
      );
    },
    [SET_PAGE]: (state, action) => {
      return state.setIn(['query', 'page', action.payload]);
    },
    [SET_SERACH]: (state, action) => {
      return state.setIn(['query', 'q'], action.payload);
    },
    [SET_SORT]: (state, action) => {
      return state.setIn(['query', 'sort'], action.payload);
    },
    [SET_LAST_PAGE]: (state, action) => {
      return state.set('lastPage', action.payload);
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
  },
  {
    type: READ_ALL_PROJECT,
    onSuccess: (state, action) => {
      const {
        payload: { data, headers },
      } = action;
      return state
        .set('data', fromJS(data))
        .set('lastPage', Number(headers['last-page']));
    },
  },
]);
