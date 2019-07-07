import React, { useEffect } from 'react';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';

const OnlyPrivate = ({ history, children }) => {
  const user = useUser();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    }
  }, [user]);
  return user ? <>{children}</> : null;
};

export default withRouter(OnlyPrivate);
