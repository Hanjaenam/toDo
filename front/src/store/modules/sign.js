import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_PROPS = 'sign/SET_PROPS';
const INIT_PROPS = 'sign/INIT_PROPS';

export const setProps = createAction(SET_PROPS);
export const initProps = createAction(INIT_PROPS);

const initialState = Map({
  email: '',
  nick: '',
  password: '',
});

export default handleActions(
  {
    [SET_PROPS]: (state, action) => {
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
    [INIT_PROPS]: (stete, action) => {
      return initialState;
    },
  },
  initialState,
);
