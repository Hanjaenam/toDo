import React, { useEffect } from 'react';
import { useUser } from 'store/User';

const OnlyPublic = ({ history, children }) => {
  const user = useUser();
  useEffect(() => {
    if (user) {
      history.replace('/me/project');
    }
  }, [user]);
  return !user ? <>{children}</> : null;
};

export default OnlyPublic;
