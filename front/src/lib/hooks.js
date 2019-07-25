import { useEffect, useState } from 'react';

export const useOnlyPublic = ({ history, signIn }) => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    if (signIn) {
      history.replace(`/me/project?page=1&sort=latest&q=`);
    } else setStartRender(true);
  }, [signIn]);
  return startRender;
};

export const useOnlyPrivate = ({ history, signIn }) => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    if (!signIn) {
      history.replace('/');
    } else setStartRender(true);
  }, [signIn]);
  return startRender;
};
