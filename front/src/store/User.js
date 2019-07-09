import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useStatus } from 'lib/hooks';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const {
    loading,
    fns: { end },
  } = useStatus();
  useEffect(() => {
    axios({
      url: '/me',
      method: 'get',
    })
      .then(res => {
        setUser(res.data);
      })
      .finally(() => end());
  }, []);
  const logIn = data => {
    setUser(data);
  };
  const logOut = () => {
    setUser(null);
  };
  return loading ? null : (
    <UserContext.Provider
      value={{ user, error, fns: { logIn, setError, logOut } }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
export const useError = () => {
  const { error } = useContext(UserContext);
  return error;
};
export const useFns = () => {
  const { fns } = useContext(UserContext);
  return fns;
};
export default UserContextProvider;
