import React, { createContext, useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();
const UserContextProvider = ({ children, history, location }) => {
  const [mount, setMount] = useState(false);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState();
  const logIn = () => {
    setLogged(true);
  };
  useEffect(() => {
    axios
      .get('/auth/getUser')
      .then(res => {
        if (res.status === 200) {
          setUser(res.data);
          setLogged(true);
        } else if (res.status === 204) {
          history.replace('/logIn');
        }
      })
      .finally(() => setMount(true));
  }, []);
  useEffect(() => {
    if (!mount) return;
    const { pathname } = location;
    if (pathname.includes('logIn') || pathname.includes('register')) {
      if (logged) {
        history.replace('/');
      }
    } else if (!logged) {
      history.replace('/logIn');
    }
  }, [location.pathname, logged]);
  return (
    <UserContext.Provider value={{ user, fn: { logIn } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};
export default withRouter(UserContextProvider);
