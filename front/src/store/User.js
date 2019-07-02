import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
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
