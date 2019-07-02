import { useState } from 'react';
import axios from 'axios';

export const useAxios = () => {
  const [state, setState] = useState({
    loading: false,
    failure: null,
  });
  const fetch = opts => {
    if (!opts.url) return;
    setState({ ...state, loading: true });
    return axios(opts)
      .then(res => {
        setState({
          ...state,
          loading: false,
        });
      })
      .catch(err => {
        setState({
          ...state,
          loading: false,
          failure: err.response.data.message[0],
        });
      });
  };
  return { state, fetch, setState };
};

export const useReplacePage = (user, history, type = 'private') => {
  if (type === 'private') {
    if (!user) {
      history.replace('/');
    } else {
      return true;
    }
  } else if (type === 'public') {
    if (user) {
      history.replace('/toDoList');
    } else {
      return true;
    }
  }
};
