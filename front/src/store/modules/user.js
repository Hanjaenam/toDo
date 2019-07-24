import { fromJS, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { authAPI } from 'lib/API';
import { applyPenders } from 'redux-pender';

const INIT_ERROR_MESSAGE = 'user/INIT_ERROR_MESSAGE';
const LOG_IN = 'user/LOG_IN';
const LOG_OUT = 'user/LOG_OUT';
const GET_INFO = 'user/GET_INFO';
const SET_ERROR_MESSAGE = 'user/SET_ERROR_MESSAGE';

export const initErrorMessage = createAction(INIT_ERROR_MESSAGE);
export const logIn = createAction(LOG_IN, authAPI.logIn);
export const logOut = createAction(LOG_OUT, authAPI.logOut);
export const getInfo = createAction(GET_INFO, authAPI.getInfo);
export const setErrorMessage = createAction(SET_ERROR_MESSAGE);

const initialState = Map({
  error: '',
  data: undefined,
});

const reducer = handleActions(
  {
    [INIT_ERROR_MESSAGE]: (state, _) => {
      return state.set('error', '');
    },
    [SET_ERROR_MESSAGE]: (state, action) => {
      return state.set('error', action.payload);
    },
  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: LOG_IN,
    onSuccess: (state, action) => {
      const {
        payload: { data },
      } = action;
      return state.set('data', fromJS(data));
    },
    onFailure: (state, action) => {
      const {
        payload: {
          response: {
            data: { message },
          },
        },
      } = action;
      return state.set('error', message[0]);
    },
  },
  {
    type: LOG_OUT,
    onSuccess: (state, action) => {
      return state.set('data', undefined);
    },
    onFailure: (state, action) => {
      const {
        payload: {
          response: {
            data: { message },
          },
        },
      } = action;
      return state.set('error', message[0]);
    },
  },
  {
    type: GET_INFO,
    onSuccess: (state, action) => {
      const {
        payload: { data },
      } = action;
      return state.set('data', fromJS(data));
    },
  },
]);
