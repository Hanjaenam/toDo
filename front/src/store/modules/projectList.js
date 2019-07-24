import { fromJS, List, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { projectAPI } from 'lib/API';
import { applyPenders } from 'redux-pender';

export const SORT = {
  LATEST: 'latest',
  IMPORTANCE: 'importance',
};

const READ_ALL_PROJECT = 'projectList/READ_ALL_PROJECT';
const SET_PAGE = 'projectList/SET_PAGE';
const SET_SERACH = 'projectList/SET_SERACH';
const SET_SORT = 'projectList/SET_SORT';

export const readAllProject = createAction(
  READ_ALL_PROJECT,
  projectAPI.readAll,
);
export const setPage = createAction(SET_PAGE);
export const setSearch = createAction(SET_SERACH);
export const setSort = createAction(SET_SORT);

const initialState = Map({
  query: Map({
    page: 1,
    q: '',
    sort: SORT.LATEST,
  }),
  data: List([]),
});

const reducer = handleActions(
  {
    [SET_PAGE]: (state, action) => {
      return state.setIn(['query', 'page', action.payload]);
    },
    [SET_SERACH]: (state, action) => {
      return state.setIn(['query', 'q'], action.payload);
    },
    [SET_SORT]: (state, action) => {
      return state.setIn(['query', 'sort'], action.payload);
    },
  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: READ_ALL_PROJECT,
    onSuccess: (state, action) => {
      const {
        payload: { data },
      } = action;
      return state.set('data', fromJS(data));
    },
  },
]);
