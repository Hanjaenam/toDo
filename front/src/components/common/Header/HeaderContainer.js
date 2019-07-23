import React from 'react';
import { withRouter } from 'react-router-dom';
import CONFIG from 'config';
import { useUser, useFns } from 'store/User';
import { userAPI } from 'lib/API';
import Header from './Header';

const HeaderContainer = ({ children, history }) => {
  const user = useUser();
  const fns = useFns();
  const goHome = () => {
    history.push(`/me/project?${CONFIG.HOME_INIT_QUERY}`);
  };
  const logOut = () => {
    userAPI.logOut().then(res => {
      if (res.status === 200) {
        fns.logOut();
      }
    });
  };
  return (
    <Header goHome={goHome} user={user} logOut={logOut}>
      {children}
    </Header>
  );
};
export default withRouter(HeaderContainer);
