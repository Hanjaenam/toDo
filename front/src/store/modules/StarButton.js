import { handleActions, createAction } from 'redux-actions';

const SET_HOVER_IMPORTANCE = 'starButton/SET_HOVERIMPORTANCE';

export const setHoverImportance = createAction(SET_HOVER_IMPORTANCE);

const initialState = 1;

export default handleActions(
  {
    [SET_HOVER_IMPORTANCE]: (stete, action) => {
      return action.payload;
    },
  },
  initialState,
);
