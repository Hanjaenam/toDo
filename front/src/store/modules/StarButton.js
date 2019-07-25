import { handleActions, createAction } from 'redux-actions';

const SET_HOVER_IMPORTACE = 'starButton/SET_HOVERIMPORTANCE';

export const setHoverImportace = createAction(SET_HOVER_IMPORTACE);

const initialState = 1;

export default handleActions(
  {
    [SET_HOVER_IMPORTACE]: (stete, action) => {
      return action.payload;
    },
  },
  initialState,
);
