import { useState } from 'react';
import axios from 'axios';

export const useAxios = (...cbList) => {
  const [state, setState] = useState({
    loading: false,
    failure: null,
    data: null,
  });
  const fetch = opts => {
    if (!opts.url) return;
    setState({ ...state, loading: true });
    axios(opts)
      .then(res => {
        setState({
          ...state,
          loading: false,
          data: res.data,
        });
        cbList.forEach(cb => cb());
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
