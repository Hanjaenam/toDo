import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  useEffect(() => {
    axios({
      url: '/me',
      method: 'get',
    }).then(res => {
      setUser(res.data);
    });
  }, []);
  const logIn = data => {
    setUser(data);
  };
  const logOut = () => {
    setUser(null);
  };
  return (
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
