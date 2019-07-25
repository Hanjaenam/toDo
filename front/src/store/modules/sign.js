import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const INIT_USER_DATA = 'sign/INIT_USER_DATA';
const SET_USER_DATA = 'sign/SET_USER_DATA';

export const initUserData = createAction(INIT_USER_DATA);
export const setUserData = createAction(SET_USER_DATA);

const initialState = Map({
  email: '',
  nick: '',
  password: '',
});

export default handleActions(
  {
    [INIT_USER_DATA]: (stete, action) => {
      return initialState;
    },
    [SET_USER_DATA]: (state, action) => {
      const { type, value } = action.payload;
      switch (type) {
        case 'email':
          return state.set('email', value);
        case 'nick':
          return state.set('nick', value);
        case 'password':
          return state.set('password', value);
        default:
          return state;
      }
    },
  },
  initialState,
);
