import React, { createContext, useState, useContext, useEffect } from 'react';
import { useFns as useUserFns, useUser } from 'store/User';
import axios from 'axios';

export const AutheContext = createContext();

const AutheContextProvider = ({ children, history }) => {
  const [status, setStatus] = useState({ loading: true, error: null });
  const setLoading = loading => setStatus({ error: null, loading });
  const setError = error => setStatus({ loading: false, error });
  const { logIn } = useUserFns();
  const user = useUser();
  useEffect(() => {
    axios({
      url: '/user/getInfo',
      method: 'get',
    }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        logIn(res.data);
        history.replace('/project');
      }
    });
  }, []);
  return !status.loading && !user ? (
    <AutheContext.Provider value={{ status, fns: { setLoading, setError } }}>
      {children}
    </AutheContext.Provider>
  ) : null;
};

export const useStatus = () => {
  const { status } = useContext(AutheContext);
  return status;
};
export const useFns = () => {
  const { fns } = useContext(AutheContext);
  return fns;
};

export default AutheContextProvider;
